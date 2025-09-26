import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import ProductRouter from "./routes/productRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// ✅ Enable file serving
app.use("/uploads", express.static("uploads"));

// ✅ Allow localhost (for dev) + your live frontend (Vercel domain)
app.use(
  cors({
    origin: ["http://localhost:3000", "https://elitepurchase.in"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Routes
app.use("/api/products", ProductRouter);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("✅ Server is running!");
});

// ✅ Start server
const PORT = process.env.PORT || 3200;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
