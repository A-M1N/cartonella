// services/mockPaymentService.js

import { PAYMENT_CONFIG } from "../config/paymentConfig";

// Simulate network delay
const simulateDelay = (ms = PAYMENT_CONFIG.demo.delayMs) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Generate mock IDs
const generateId = (prefix) => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Validate test card
const validateTestCard = (cardNumber) => {
  const cleanNumber = cardNumber.replace(/\s/g, "");

  if (cleanNumber === PAYMENT_CONFIG.testCards.success) {
    return { valid: true, status: "success" };
  }
  if (cleanNumber === PAYMENT_CONFIG.testCards.decline) {
    return { valid: false, status: "declined", message: "Card declined" };
  }
  if (cleanNumber === PAYMENT_CONFIG.testCards.insufficientFunds) {
    return {
      valid: false,
      status: "insufficient_funds",
      message: "Insufficient funds",
    };
  }
  if (cleanNumber === PAYMENT_CONFIG.testCards.expired) {
    return { valid: false, status: "expired", message: "Card expired" };
  }

  // Any other 16-digit number is valid for demo
  if (cleanNumber.length === 16 && /^\d+$/.test(cleanNumber)) {
    return { valid: true, status: "success" };
  }

  return { valid: false, status: "invalid", message: "Invalid card number" };
};

// Mock Stripe Payment
export const mockStripePayment = async ({ amount, cardDetails, orderId }) => {
  await simulateDelay();

  const validation = validateTestCard(cardDetails.cardNumber);

  if (!validation.valid) {
    throw new Error(validation.message);
  }

  return {
    success: true,
    paymentId: generateId("pi"),
    paymentMethod: generateId("pm"),
    status: "succeeded",
    amount,
    currency: "usd",
    orderId,
    created: new Date().toISOString(),
    receipt_url: `https://pay.stripe.com/receipts/${generateId("rcpt")}`,
  };
};

// Mock PayPal Payment (when sandbox not available)
export const mockPayPalPayment = async ({ amount, orderId }) => {
  await simulateDelay();

  return {
    success: true,
    paymentId: generateId("PAYPAL"),
    payerId: generateId("PAYER"),
    status: "COMPLETED",
    amount,
    currency: "USD",
    orderId,
    create_time: new Date().toISOString(),
    payer: {
      email_address: "buyer@example.com",
      payer_id: generateId("PAYER"),
      name: {
        given_name: "John",
        surname: "Doe",
      },
    },
  };
};

// Mock Skrill Payment
export const mockSkrillPayment = async ({ amount, email, orderId }) => {
  await simulateDelay();

  return {
    success: true,
    transactionId: generateId("MB"),
    status: "2", // Skrill success status
    amount,
    currency: "USD",
    orderId,
    pay_from_email: email,
    merchant_id: "DEMO_MERCHANT",
    payment_type: "WLT",
  };
};

// Mock Apple Pay Payment
export const mockApplePayPayment = async ({ amount, orderId }) => {
  await simulateDelay(1000); // Apple Pay is typically faster

  return {
    success: true,
    paymentId: generateId("apple_pay"),
    token: generateId("tok"),
    status: "success",
    amount,
    orderId,
    paymentMethod: {
      displayName: "Visa 4242",
      network: "Visa",
      type: "debit",
    },
  };
};

// Mock Google Pay Payment
export const mockGooglePayPayment = async ({ amount, orderId }) => {
  await simulateDelay(1000);

  return {
    success: true,
    paymentId: generateId("google_pay"),
    paymentMethodToken: generateId("tok"),
    status: "success",
    amount,
    orderId,
    paymentMethodData: {
      description: "•••• 4242",
      type: "CARD",
      info: {
        cardNetwork: "VISA",
        cardDetails: "4242",
      },
    },
  };
};

// Unified mock payment processor
export const processMockPayment = async (provider, paymentData) => {
  switch (provider) {
    case "Stripe":
      return mockStripePayment(paymentData);
    case "Paypal":
      return mockPayPalPayment(paymentData);
    case "Skrill":
      return mockSkrillPayment(paymentData);
    case "ApplePay":
      return mockApplePayPayment(paymentData);
    case "GooglePay":
      return mockGooglePayPayment(paymentData);
    default:
      throw new Error(`Unknown payment provider: ${provider}`);
  }
};
