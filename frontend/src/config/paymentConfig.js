// config/paymentConfig.js

export const PAYMENT_CONFIG = {
  // Set which providers are available in your region
  providers: {
    PAYPAL: {
      enabled: true,
      mode: "sandbox", // 'sandbox' | 'production' | 'mock'
      name: "PayPal",
    },
    STRIPE: {
      enabled: true,
      mode: "mock", // Can't use real Stripe
      name: "Stripe",
    },
    SKRILL: {
      enabled: true,
      mode: "mock", // Can't use real Skrill
      name: "Skrill",
    },
    APPLE_PAY: {
      enabled: true,
      mode: "mock",
      name: "Apple Pay",
    },
    GOOGLE_PAY: {
      enabled: true,
      mode: "mock",
      name: "Google Pay",
    },
  },

  // Demo settings
  demo: {
    simulateNetworkDelay: true,
    delayMs: 1500,
    showDemoIndicator: true,
    allowFailureSimulation: true,
  },

  // Test card numbers for mock
  testCards: {
    success: "4242424242424242",
    decline: "4000000000000002",
    insufficientFunds: "4000000000009995",
    expired: "4000000000000069",
  },
};

export const getProviderMode = (provider) => {
  return PAYMENT_CONFIG.providers[provider]?.mode || "mock";
};

export const isProviderEnabled = (provider) => {
  return PAYMENT_CONFIG.providers[provider]?.enabled || false;
};
