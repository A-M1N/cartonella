import express from "express";
import { protect } from "../middleware/auth.js";
import { adminOnly } from "../middleware/admin.js";
import { getAdminStats } from "../controllers/adminController.js";
import { getAllUsers } from "../controllers/adminController.js";

const router = express.Router();

router.get("/stats", protect, adminOnly, getAdminStats);
router.get("/users", protect, adminOnly, getAllUsers);

export default router;
