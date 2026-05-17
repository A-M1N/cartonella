// controllers/paymentController.js
import prisma from "../lib/prisma.js";
import crypto from "crypto";

// ============ PAYPAL ============

// @route POST /api/payments/paypal/create-order
// @desc Create PayPal order
export const createPayPalOrder = async (req, res) => {
  try {
    const { amount, currency = "USD", orderId } = req.body;

    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`,
    ).toString("base64");

    // Get access token
    const tokenResponse = await fetch(
      `${process.env.PAYPAL_API_URL}/v1/oauth2/token`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
      },
    );

    const { access_token } = await tokenResponse.json();

    // Create order
    const orderResponse = await fetch(
      `${process.env.PAYPAL_API_URL}/v2/checkout/orders`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: currency,
                value: amount.toFixed(2),
              },
              reference_id: orderId?.toString(),
            },
          ],
          application_context: {
            return_url: `${process.env.FRONTEND_URL}/payment/success`,
            cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
          },
        }),
      },
    );

    const paypalOrder = await orderResponse.json();

    res.json({
      success: true,
      orderID: paypalOrder.id,
      approvalUrl: paypalOrder.links.find((l) => l.rel === "approve")?.href,
    });
  } catch (error) {
    console.error("PayPal Create Order Error:", error);
    res.status(500).json({ message: "Failed to create PayPal order" });
  }
};

// @route POST /api/payments/paypal/capture-order
// @desc Capture PayPal order
export const capturePayPalOrder = async (req, res) => {
  try {
    const { paypalOrderId, orderId } = req.body;

    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`,
    ).toString("base64");

    // Get access token
    const tokenResponse = await fetch(
      `${process.env.PAYPAL_API_URL}/v1/oauth2/token`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
      },
    );

    const { access_token } = await tokenResponse.json();

    // Capture order
    const captureResponse = await fetch(
      `${process.env.PAYPAL_API_URL}/v2/checkout/orders/${paypalOrderId}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      },
    );

    const captureData = await captureResponse.json();

    if (captureData.status === "COMPLETED") {
      // Update order
      const order = await prisma.order.update({
        where: { id: parseInt(orderId) },
        data: {
          paymentStatus: "COMPLETED",
          paymentId: paypalOrderId,
          payerId: captureData.payer?.payer_id,
          status: "CONFIRMED",
          paidAt: new Date(),
        },
        include: {
          items: { include: { product: true } },
          shippingAddress: true,
        },
      });

      res.json({
        success: true,
        message: "Payment captured",
        order,
        captureData,
      });
    } else {
      res.status(400).json({
        message: "Payment capture failed",
        status: captureData.status,
      });
    }
  } catch (error) {
    console.error("PayPal Capture Error:", error);
    res.status(500).json({ message: "Failed to capture PayPal order" });
  }
};

// ============ SKRILL ============

// @route POST /api/payments/skrill/create-session
// @desc Create Skrill payment session
export const createSkrillSession = async (req, res) => {
  try {
    const { amount, currency = "USD", orderId, email, returnUrl } = req.body;

    // Skrill Quick Checkout URL parameters
    const skrillParams = new URLSearchParams({
      pay_to_email: process.env.SKRILL_MERCHANT_EMAIL,
      status_url: `${process.env.BACKEND_URL}/api/payments/skrill/webhook`,
      return_url: returnUrl || `${process.env.FRONTEND_URL}/payment/success`,
      cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
      language: "EN",
      amount: amount.toFixed(2),
      currency,
      detail1_description: "Order",
      detail1_text: orderId,
      merchant_fields: "orderId",
      orderId,
      pay_from_email: email,
    });

    // For production, you'd redirect to Skrill
    const skrillUrl = `https://pay.skrill.com/?${skrillParams.toString()}`;

    res.json({
      success: true,
      redirectUrl: skrillUrl,
      sessionId: `SKRILL_${Date.now()}_${orderId}`,
    });
  } catch (error) {
    console.error("Skrill Session Error:", error);
    res.status(500).json({ message: "Failed to create Skrill session" });
  }
};

// @route POST /api/payments/skrill/webhook
// @desc Handle Skrill webhook
export const handleSkrillWebhook = async (req, res) => {
  try {
    const {
      status,
      mb_transaction_id,
      merchant_fields,
      pay_from_email,
      md5sig,
    } = req.body;

    // Verify MD5 signature
    const expectedSig = crypto
      .createHash("md5")
      .update(
        `${process.env.SKRILL_MERCHANT_ID}${req.body.transaction_id}${crypto.createHash("md5").update(process.env.SKRILL_SECRET_WORD).digest("hex").toUpperCase()}${req.body.mb_amount}${req.body.mb_currency}${status}`,
      )
      .digest("hex")
      .toUpperCase();

    if (md5sig !== expectedSig) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    const orderId = merchant_fields?.orderId || req.body.orderId;

    if (status === "2") {
      // Payment successful
      await prisma.order.update({
        where: { id: parseInt(orderId) },
        data: {
          paymentStatus: "COMPLETED",
          paymentId: mb_transaction_id,
          payerId: pay_from_email,
          status: "CONFIRMED",
          paidAt: new Date(),
        },
      });
    } else if (status === "-2") {
      // Payment failed
      await prisma.order.update({
        where: { id: parseInt(orderId) },
        data: {
          paymentStatus: "FAILED",
        },
      });
    }

    res.status(200).send("OK");
  } catch (error) {
    console.error("Skrill Webhook Error:", error);
    res.status(500).json({ message: "Webhook processing failed" });
  }
};

// ============ GOOGLE PAY ============

// @route POST /api/payments/googlepay/process
// @desc Process Google Pay payment through Stripe
export const processGooglePay = async (req, res) => {
  try {
    const { paymentMethodId, amount, orderId } = req.body;

    const amountInCents = Math.round(amount * 100);

    // Create payment intent with the Google Pay payment method
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
      metadata: {
        orderId: orderId?.toString(),
        paymentType: "google_pay",
      },
    });

    if (paymentIntent.status === "succeeded") {
      const order = await prisma.order.update({
        where: { id: parseInt(orderId) },
        data: {
          paymentStatus: "COMPLETED",
          paymentId: paymentIntent.id,
          status: "CONFIRMED",
          paidAt: new Date(),
        },
        include: {
          items: { include: { product: true } },
          shippingAddress: true,
        },
      });

      res.json({
        success: true,
        order,
        paymentIntent,
      });
    } else {
      res.status(400).json({
        message: "Payment not completed",
        status: paymentIntent.status,
      });
    }
  } catch (error) {
    console.error("Google Pay Error:", error);
    res.status(500).json({ message: "Google Pay processing failed" });
  }
};

// ============ APPLE PAY ============

// @route POST /api/payments/applepay/process
// @desc Process Apple Pay payment through Stripe
export const processApplePay = async (req, res) => {
  try {
    const { paymentMethodId, amount, orderId } = req.body;

    const amountInCents = Math.round(amount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
      metadata: {
        orderId: orderId?.toString(),
        paymentType: "APPLE_PAY",
      },
    });

    if (paymentIntent.status === "succeeded") {
      const order = await prisma.order.update({
        where: { id: parseInt(orderId) },
        data: {
          paymentStatus: "COMPLETED",
          paymentId: paymentIntent.id,
          status: "CONFIRMED",
          paidAt: new Date(),
        },
        include: {
          items: { include: { product: true } },
          shippingAddress: true,
        },
      });

      res.json({
        success: true,
        order,
        paymentIntent,
      });
    } else {
      res.status(400).json({
        message: "Payment not completed",
        status: paymentIntent.status,
      });
    }
  } catch (error) {
    console.error("Apple Pay Error:", error);
    res.status(500).json({ message: "Apple Pay processing failed" });
  }
};

// ============ STRIPE WEBHOOK ============

// @route POST /api/payments/stripe/webhook
// @desc Handle Stripe webhooks
export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      const orderId = paymentIntent.metadata.orderId;

      if (orderId) {
        await prisma.order.update({
          where: { id: parseInt(orderId) },
          data: {
            paymentStatus: "COMPLETED",
            paymentId: paymentIntent.id,
            status: "CONFIRMED",
            paidAt: new Date(),
          },
        });
      }
      break;

    case "payment_intent.payment_failed":
      const failedPayment = event.data.object;
      const failedOrderId = failedPayment.metadata.orderId;

      if (failedOrderId) {
        await prisma.order.update({
          where: { id: parseInt(failedOrderId) },
          data: {
            paymentStatus: "FAILED",
          },
        });
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};

// @route GET /api/payments/config
// @desc Get payment configuration for frontend
export const getPaymentConfig = async (req, res) => {
  res.json({
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    paypalClientId: process.env.PAYPAL_CLIENT_ID,
    googlePayMerchantId: process.env.GOOGLE_PAY_MERCHANT_ID,
    applePayMerchantId: process.env.APPLE_PAY_MERCHANT_ID,
    environment: process.env.NODE_ENV,
  });
};
