import ShippingForm from "../ui/Sections/Checkout/ShippingForm.jsx";
import Steps from "../ui/Components/Steps.jsx";
import ShipTo from "../ui/Sections/Checkout/ShipTo.jsx";

import OrderSummary from "../ui/Sections/Checkout/OrderSummary.jsx";
import styles from "../pages/CheckoutPage.module.css";
import PaymentMethod from "../ui/Sections/Checkout/PaymentMethod.jsx";
import PaymentProcessor from "../ui/Sections/Checkout/PaymentProcessor.jsx";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

import orderService from "../services/orderService";
import {
  selectCartItems,
  selectCartTotalPrice,
  selectCartTotalQuantity,
} from "../store/slices/cartSlice";

function CheckoutPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [shippingData, setShippingData] = useState(null);

  const handleEditShipping = () => {
    setStep(1);
  };

  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartTotalPrice);
  const totalQuantity = useSelector(selectCartTotalQuantity);

  const shippingFee = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1;

  const [selectedPayment, setSelectedPayment] = useState({
    title: "Paypal",
    hoverColor: "#4d70f0",
  });

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  const calculateDiscount = () => {
    if (!appliedCoupon) {
      return 0;
    }
    switch (appliedCoupon.type) {
      case "PERCENTAGE":
        return (subtotal * appliedCoupon.value) / 100;
      case "FREE_SHIPPING":
        return shippingFee;
      case "FIXED":
        return Math.min(appliedCoupon.value, subtotal);
      default:
        return 0;
    }
  };

  const discount = calculateDiscount();
  const finalShipping =
    appliedCoupon?.type === "FREE_SHIPPING" ? 0 : shippingFee;
  const total = subtotal - discount + finalShipping + tax;

  const handleApplyCoupon = async () => {
    setCouponError("");

    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code");
      return;
    }
    setCouponLoading(true);

    try {
      const response = await orderService.validateCoupon(couponCode, subtotal);
      setAppliedCoupon(response.coupon);
      setCouponError("");
    } catch (error) {
      setCouponError(error.response?.data?.message || "Invalid coupon code");
      setAppliedCoupon(null);
    } finally {
      setCouponLoading(false);
    }
  };

  // Remove coupon handler
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  if (cartItems.length === 0) return null;

  const orderData = {
    subtotal,
    shippingFee: finalShipping,
    tax,
    discount,
    total,
    totalQuantity,
    appliedCoupon,
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionContainer}>
          <div className={styles.leftPanel}>
            {step === 1 && (
              <ShippingForm
                setShippingData={setShippingData}
                setStep={setStep}
                savedData={shippingData}
              />
            )}
            {step === 2 && (
              <>
                <PaymentMethod
                  selectedPayment={selectedPayment}
                  setSelectedPayment={setSelectedPayment}
                  step={step}
                  setStep={setStep}
                />
                <ShipTo
                  shippingData={shippingData}
                  onEdit={handleEditShipping}
                />
              </>
            )}
          </div>
          <div className={styles.rightPanel}>
            <Steps step={step} />
            {step === 2 && (
              <PaymentProcessor
                selectedPayment={selectedPayment}
                orderData={orderData}
                shippingData={shippingData}
                cartItems={cartItems}
                couponCode={couponCode}
                appliedCoupon={appliedCoupon}
                setCouponCode={setCouponCode}
                couponError={couponError}
                couponLoading={couponLoading}
                onApplyCoupon={handleApplyCoupon}
                onRemoveCoupon={handleRemoveCoupon}
              />
            )}
            <OrderSummary cartItems={cartItems} orderData={orderData} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CheckoutPage;
