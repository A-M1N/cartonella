import express from "express";
import {
  createPayPalOrder,
  capturePayPalOrder,
  createSkrillSession,
  handleSkrillWebhook,
  processGooglePay,
  processApplePay,
  getPaymentConfig,
} from "../controllers/paymentController.js";

const router = express.Router();

// Config
router.get("/config", getPaymentConfig);

// PayPal
router.post("/paypal/create-order", createPayPalOrder);
router.post("/paypal/capture-order", capturePayPalOrder);

// Skrill
router.post("/skrill/create-session", createSkrillSession);
router.post("/skrill/webhook", handleSkrillWebhook);

// Google Pay
router.post("/googlepay/process", processGooglePay);

// Apple Pay
router.post("/applepay/process", processApplePay);

export default router;
