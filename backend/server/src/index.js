import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { globalLimiter, authLimiter } from "./middleware/rateLimiter.js";

import authRoutes from "../src/routes/auth.js";
import addressRoutes from "../src/routes/address.js";
import uploadRoutes from "../src/routes/upload.js";
import productRoutes from "./routes/products.js";
import categoryRoutes from "./routes/categories.js";
import collectionRoutes from "./routes/collections.js";
import orderRoutes from "./routes/order.js";
import paymentRoutes from "./routes/payment.js";
import reviewRoutes from "./routes/review.js";
import dealRoutes from "./routes/deal.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

// Get Directory Name for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  "/api/payments/stripe/webhook",
  express.raw({ type: "application/json" })
);

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://cartonella.vercel.app/"],
    credentials: true,
  })
);

//app.use(globalLimiter);
//app.use("/api/auth", authLimiter);

app.get("/", (req, res) => {
  res.json({
    message: "Caronella API is Running 🚀 ",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/products", productRoutes);
app.use("/api/deals", dealRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api", reviewRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
