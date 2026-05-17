import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  getMyOrders,
  updateOrderToPaid,
  updateOrderStatus,
  cancelOrder,
  validateCoupon,
  getPayPalClientId,
} from "../controllers/orderController.js";
import { protect } from "../middleware/auth.js";
import { adminOnly } from "../middleware/admin.js";

const router = express.Router();

router.get("/paypal-client-id", getPayPalClientId);
router.post("/validate-coupon", validateCoupon);

//protected routes requires login
router.post("/", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/pay", protect, updateOrderToPaid);
router.put("/:id/cancel", protect, cancelOrder);

//Admin Routes
router.get("/", protect, adminOnly, getAllOrders);
router.put("/:id/status", protect, adminOnly, updateOrderStatus);

export default router;
