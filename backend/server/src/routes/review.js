import express from "express";
import { protect } from "../middleware/auth.js";
import {
  getProductReviews,
  canUserReview,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";

const router = express.Router();

//public routes
router.get("/products/:productId/reviews", getProductReviews);

//Protected Routes
router.get("/products/:productId/reviews/can-review", protect, canUserReview);
router.post("/products/:productId/reviews", protect, createReview);
router.put("/reviews/:reviewId", protect, updateReview);
router.delete("/reviews/:reviewId", protect, deleteReview);

export default router;
