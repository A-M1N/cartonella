import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { clearCart } from "../../../store/slices/cartSlice";
import { useCreateOrder, useUpdateOrderToPaid } from "../../../hooks/useOrders";
import { processMockPayment } from "../../../services/mockPaymentService";
import { PAYMENT_CONFIG, getProviderMode } from "../../../config/paymentConfig";
import styles from "../Checkout/PaymentProcessor.module.css";
import Spinner from "../../Components/Spinner.jsx";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaLock,
  FaInfoCircle,
} from "react-icons/fa";
import { BiCreditCard } from "react-icons/bi";
import { MdSecurity } from "react-icons/md";
import formatPrice from "../../../utils/formatPrice";

// Payment images
import paypalLogo from "../../../data/payment/small/Paypal.png";
import stripeLogo from "../../../data/payment/small/stripe.png";
import appleLogo from "../../../data/payment/small/Applepay.png";
import googleLogo from "../../../data/payment/small/stripe.png";
import skrillLogo from "../../../data/payment/small/Skrill.png";
import visaLogo from "../../../data/visa.svg";
import mastercardLogo from "../../../data/mastercard.svg";
import amexLogo from "../../../data/mastercard.svg";

export default function PaymentProcessor({
  selectedPayment,
  orderData,
  shippingData,
  cartItems,
  onSuccess,
  onError,
  couponCode,
  appliedCoupon,
  setCouponCode,
  couponError,
  couponLoading,
  onApplyCoupon,
  onRemoveCoupon,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState("form"); // 'form' | 'processing' | 'success' | 'error'
  const [error, setError] = useState(null);

  const [cardForm, setCardForm] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    name: "",
  });
  const [cardErrors, setCardErrors] = useState({});

  const createOrderMutation = useCreateOrder();
  const updateOrderToPaidMutation = useUpdateOrderToPaid();

  const { total } = orderData;

  const providerMode = getProviderMode(
    selectedPayment.title.toUpperCase().replace(" ", "_"),
  );

  // Build order payload
  const buildOrderPayload = useCallback(
    () => ({
      items: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
      shippingAddress: shippingData,
      paymentMethod: selectedPayment.title.toUpperCase().replace(" ", "_"),
      subtotal: orderData.subtotal,
      shippingFee: orderData.shippingFee,
      tax: orderData.tax,
      discount: orderData.discount,
      couponCode: orderData.appliedCoupon?.code || null,
      total: orderData.total,
    }),
    [cartItems, shippingData, selectedPayment, orderData],
  );

  // Create order in backend
  const createOrder = async () => {
    const response = await createOrderMutation.mutateAsync(buildOrderPayload());
    return response.order;
  };

  // Handle successful payment
  const handlePaymentSuccess = async (paymentDetails, order) => {
    try {
      // Update order as paid
      await updateOrderToPaidMutation.mutateAsync({
        orderId: order.id,
        paymentResult: {
          paymentId: paymentDetails.paymentId,
          payerId: paymentDetails.payerId || null,
          status: paymentDetails.status,
        },
      });

      // Clear cart
      dispatch(clearCart());

      // Show success briefly then navigate
      setPaymentStep("success");

      setTimeout(() => {
        navigate(`/order/${order.id}`, {
          state: {
            orderNumber: order.orderNumber,
            paymentId: paymentDetails.paymentId,
            paymentMethod: selectedPayment.title,
          },
        });
      }, 1500);

      onSuccess?.(order);
    } catch (err) {
      console.error("Order update failed:", err);
      setError(
        "Payment successful but order update failed. Please contact support.",
      );
      setPaymentStep("error");
      onError?.(err);
    }
  };

  // Validate card form
  const validateCardForm = () => {
    const errors = {};
    const cleanCardNumber = cardForm.cardNumber.replace(/\s/g, "");

    if (!cleanCardNumber || cleanCardNumber.length < 16) {
      errors.cardNumber = "Please enter a valid card number";
    }

    if (!cardForm.expiry || !/^\d{2}\/\d{2}$/.test(cardForm.expiry)) {
      errors.expiry = "Invalid expiry date";
    } else {
      const [month, year] = cardForm.expiry.split("/");
      const expDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
      if (expDate < new Date()) {
        errors.expiry = "Card has expired";
      }
    }

    if (!cardForm.cvc || cardForm.cvc.length < 3) {
      errors.cvc = "Invalid CVC";
    }

    if (!cardForm.name.trim()) {
      errors.name = "Please enter cardholder name";
    }

    setCardErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  // Detect card type
  const getCardType = (number) => {
    const cleanNumber = number.replace(/\s/g, "");
    if (/^4/.test(cleanNumber)) return "visa";
    if (/^5[1-5]/.test(cleanNumber)) return "mastercard";
    if (/^3[47]/.test(cleanNumber)) return "amex";
    return null;
  };

  // ============ PROCESS CARD PAYMENT (MOCK) ============
  const handleCardPayment = async () => {
    if (!validateCardForm()) return;

    setIsProcessing(true);
    setPaymentStep("processing");
    setError(null);

    try {
      // Create order first
      const order = await createOrder();

      // Process mock payment
      const paymentResult = await processMockPayment(selectedPayment.title, {
        amount: total,
        orderId: order.id,
        cardDetails: cardForm,
      });

      await handlePaymentSuccess(paymentResult, order);
    } catch (err) {
      setError(err.message || "Payment failed. Please try again.");
      setPaymentStep("error");
      setIsProcessing(false);
      onError?.(err);
    }
  };

  // ============ PROCESS WALLET PAYMENT (MOCK) ============
  const handleWalletPayment = async () => {
    setIsProcessing(true);
    setPaymentStep("processing");
    setError(null);

    try {
      const order = await createOrder();

      const paymentResult = await processMockPayment(selectedPayment.title, {
        amount: total,
        orderId: order.id,
        email: shippingData.email,
      });

      await handlePaymentSuccess(paymentResult, order);
    } catch (err) {
      setError(err.message || "Payment failed. Please try again.");
      setPaymentStep("error");
      setIsProcessing(false);
      onError?.(err);
    }
  };

  // ============ RENDER STRIPE/CARD FORM ============
  const renderCardForm = () => {
    const cardType = getCardType(cardForm.cardNumber);

    return (
      <div className={styles.cardForm}>
        <div className={styles.cardHeader}>
          <BiCreditCard size={24} />
          <span>Pay with Card</span>
          <div className={styles.cardLogos}>
            <img
              src={visaLogo}
              alt="Visa"
              className={cardType === "visa" ? styles.activeCard : ""}
            />
            <img
              src={mastercardLogo}
              alt="Mastercard"
              className={cardType === "mastercard" ? styles.activeCard : ""}
            />
            <img
              src={amexLogo}
              alt="Amex"
              className={cardType === "amex" ? styles.activeCard : ""}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Card Number</label>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              value={cardForm.cardNumber}
              onChange={(e) =>
                setCardForm({
                  ...cardForm,
                  cardNumber: formatCardNumber(e.target.value),
                })
              }
              className={cardErrors.cardNumber ? styles.inputError : ""}
            />
            {cardType && (
              <img
                src={
                  cardType === "visa"
                    ? visaLogo
                    : cardType === "mastercard"
                      ? mastercardLogo
                      : amexLogo
                }
                alt={cardType}
                className={styles.cardTypeIcon}
              />
            )}
          </div>
          {cardErrors.cardNumber && (
            <span className={styles.errorText}>{cardErrors.cardNumber}</span>
          )}
          <span className={styles.hint}>
            <FaInfoCircle size={12} /> Use 4242 4242 4242 4242 for successful
            payment
          </span>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Expiry Date</label>
            <input
              type="text"
              placeholder="MM/YY"
              maxLength={5}
              value={cardForm.expiry}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, "");
                if (value.length >= 2) {
                  value = value.slice(0, 2) + "/" + value.slice(2);
                }
                setCardForm({ ...cardForm, expiry: value });
              }}
              className={cardErrors.expiry ? styles.inputError : ""}
            />
            {cardErrors.expiry && (
              <span className={styles.errorText}>{cardErrors.expiry}</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <label>CVC</label>
            <input
              type="text"
              placeholder="123"
              maxLength={4}
              value={cardForm.cvc}
              onChange={(e) =>
                setCardForm({
                  ...cardForm,
                  cvc: e.target.value.replace(/\D/g, ""),
                })
              }
              className={cardErrors.cvc ? styles.inputError : ""}
            />
            {cardErrors.cvc && (
              <span className={styles.errorText}>{cardErrors.cvc}</span>
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Cardholder Name</label>
          <input
            type="text"
            placeholder="John Doe"
            value={cardForm.name}
            onChange={(e) => setCardForm({ ...cardForm, name: e.target.value })}
            className={cardErrors.name ? styles.inputError : ""}
          />
          {cardErrors.name && (
            <span className={styles.errorText}>{cardErrors.name}</span>
          )}
        </div>

        <button
          className={styles.payButton}
          onClick={handleCardPayment}
          disabled={isProcessing}
          style={{ backgroundColor: selectedPayment.hoverColor || "#6461FC" }}
        >
          {isProcessing ? (
            <AiOutlineLoading3Quarters className={styles.spinner} />
          ) : (
            <>
              <FaLock size={14} />
              Pay {formatPrice(total)}
            </>
          )}
        </button>

        <div className={styles.securityNote}>
          <MdSecurity size={16} />
          <span>Your payment information is secure and encrypted</span>
        </div>
      </div>
    );
  };

  // ============ RENDER PAYPAL ============
  const renderPayPal = () => {
    if (providerMode === "sandbox" && import.meta.env.VITE_PAYPAL_CLIENT_ID) {
      return (
        <div style={{ position: "relative", zIndex: 0 }}>
          <PayPalScriptProvider
            options={{
              "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
              currency: "USD",
            }}
          >
            <PayPalButtons
              style={{
                layout: "vertical",
                color: "blue",
                shape: "rect",
                height: 45,
              }}
              disabled={isProcessing}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: total.toFixed(2),
                        currency_code: "USD",
                      },
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                setIsProcessing(true);
                setPaymentStep("processing");

                try {
                  const details = await actions.order.capture();
                  const order = await createOrder();

                  await handlePaymentSuccess(
                    {
                      paymentId: details.id,
                      payerId: details.payer?.payer_id,
                      status: details.status,
                    },
                    order,
                  );
                } catch (err) {
                  setError(err.message);
                  setPaymentStep("error");
                  setIsProcessing(false);
                }
              }}
              onError={(err) => {
                setError("PayPal error. Please try again.");
                setIsProcessing(false);
              }}
              onCancel={() => {
                setIsProcessing(false);
              }}
            />
          </PayPalScriptProvider>
        </div>
      );
    }

    // Mock PayPal
    return (
      <button
        className={styles.paypalButton}
        onClick={handleWalletPayment}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <AiOutlineLoading3Quarters className={styles.spinner} />
        ) : (
          <>
            <img src={paypalLogo} alt="PayPal" />
            Pay with PayPal
          </>
        )}
      </button>
    );
  };

  // ============ RENDER SKRILL ============
  const renderSkrill = () => (
    <button
      className={styles.skrillButton}
      onClick={handleWalletPayment}
      disabled={isProcessing}
    >
      {isProcessing ? (
        <AiOutlineLoading3Quarters className={styles.spinner} />
      ) : (
        <>
          <img src={skrillLogo} alt="Skrill" />
          Pay with Skrill
        </>
      )}
    </button>
  );

  // ============ RENDER APPLE PAY ============
  const renderApplePay = () => (
    <button
      className={styles.applePayButton}
      onClick={handleWalletPayment}
      disabled={isProcessing}
    >
      {isProcessing ? (
        <AiOutlineLoading3Quarters className={styles.spinner} />
      ) : (
        <>
          <img src={appleLogo} alt="Apple Pay" />
          Pay with Apple Pay
        </>
      )}
    </button>
  );

  // ============ RENDER GOOGLE PAY ============
  const renderGooglePay = () => (
    <button
      className={styles.googlePayButton}
      onClick={handleWalletPayment}
      disabled={isProcessing}
    >
      {isProcessing ? (
        <AiOutlineLoading3Quarters className={styles.spinner} />
      ) : (
        <>
          <img src={googleLogo} alt="Google Pay" />
          Pay with Google Pay
        </>
      )}
    </button>
  );

  // ============ RENDER PROCESSING OVERLAY ============
  const renderProcessingOverlay = () => {
    if (paymentStep !== "processing") return null;

    return (
      <div className={styles.processingOverlay}>
        <div className={styles.processingContent}>
          <div className={styles.processingAnimation}>
            <AiOutlineLoading3Quarters className={styles.spinnerLarge} />
          </div>
          <h3>Processing Payment</h3>
          <p>
            Please wait while we process your {selectedPayment.title} payment...
          </p>
          <div className={styles.processingSteps}>
            <div className={`${styles.step} ${styles.active}`}>
              <FaCheckCircle /> Validating payment details
            </div>
            <div className={`${styles.step} ${styles.active}`}>
              <AiOutlineLoading3Quarters className={styles.stepSpinner} />{" "}
              Processing transaction
            </div>
            <div className={styles.step}>
              <span className={styles.stepPending}>○</span> Confirming order
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============ RENDER SUCCESS OVERLAY ============
  const renderSuccessOverlay = () => {
    if (paymentStep !== "success") return null;

    return (
      <div className={styles.successOverlay}>
        <div className={styles.successContent}>
          <FaCheckCircle className={styles.successIcon} />
          <h3>Payment Successful!</h3>
          <p>Redirecting to order confirmation...</p>
        </div>
      </div>
    );
  };

  // ============ RENDER ERROR ============
  const renderError = () => {
    if (paymentStep !== "error" || !error) return null;

    return (
      <div className={styles.errorOverlay}>
        <div className={styles.errorContent}>
          <FaTimesCircle className={styles.errorIcon} />
          <h3>Payment Failed</h3>
          <p>{error}</p>
          <button
            className={styles.retryButton}
            onClick={() => {
              setPaymentStep("form");
              setError(null);
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  };

  // ============ RENDER PAYMENT METHOD ============
  const renderPaymentMethod = () => {
    if (paymentStep !== "form") return null;

    switch (selectedPayment.title) {
      case "Stripe":
        return renderCardForm();
      case "Paypal":
        return renderPayPal();
      case "Skrill":
        return renderSkrill();
      case "ApplePay":
        return renderApplePay();
      case "GooglePay":
        return renderGooglePay();
      default:
        return renderCardForm();
    }
  };

  return (
    <>
      <div className={styles.couponSection}>
        {!appliedCoupon ? (
          <>
            <div className={styles.couponRow}>
              <input
                className={styles.couponInput}
                placeholder="Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                onKeyPress={(e) => e.key === "Enter" && onApplyCoupon()}
                disabled={couponLoading}
              />
              <button
                className={styles.couponBtn}
                onClick={onApplyCoupon}
                disabled={couponLoading}
              >
                {couponLoading ? <Spinner size={20} /> : "Apply"}
              </button>
            </div>
            {couponError && <p className={styles.couponError}>{couponError}</p>}
          </>
        ) : (
          <div className={styles.appliedCoupon}>
            <FaCheck className={styles.checkIcon} />
            <span className={styles.label}>
              <strong>{appliedCoupon.code}</strong> - {appliedCoupon.label}
            </span>
            <button onClick={onRemoveCoupon} className={styles.removeCouponBtn}>
              Remove
              <IoClose size={25} />
            </button>
          </div>
        )}
      </div>
      <div className={styles.container}>
        {providerMode === "mock" && PAYMENT_CONFIG.demo.showDemoIndicator && (
          <div className={styles.demoNotice}>
            <span className={styles.demoIcon}>🧪</span>
            <div>
              <strong>Test Mode</strong>
              <p>This is a simulated payment. No real charges will be made.</p>
            </div>
          </div>
        )}

        {/* Test Cards Info */}
        {providerMode === "mock" && selectedPayment.title === "Stripe" && (
          <div className={styles.testCardsInfo}>
            <h5>Test Card Numbers:</h5>
            <ul>
              <li>
                <code>4242 4242 4242 4242</code> - Success
              </li>
              <li>
                <code>4000 0000 0000 0002</code> - Declined
              </li>
              <li>
                <code>4000 0000 0000 9995</code> - Insufficient funds
              </li>
            </ul>
          </div>
        )}

        {/* Payment Method */}
        <div className={styles.paymentSection}>{renderPaymentMethod()}</div>

        {/* Overlays */}
        {renderProcessingOverlay()}
        {renderSuccessOverlay()}
        {renderError()}
      </div>
    </>
  );
}
