import express from "express";
import { protect } from "../middleware/auth.js";
import {
  getDealOfDay,
  createDailyDeal,
  deleteDailyDeal,
} from "../controllers/dealController.js";
import { adminOnly } from "../middleware/admin.js";

const router = express.Router();

router.get("/today", getDealOfDay);

router.post("/", protect, adminOnly, createDailyDeal);
router.delete("/:id", protect, adminOnly, deleteDailyDeal);

export default router;
