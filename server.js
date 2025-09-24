import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import ProductRouter from "./routes/productRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// ✅ Connect to MongoDB (we won’t use it yet, just testing connection)
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


app.use("/api/products", ProductRouter);

// Test route
app.get("/", (req, res) => {
  res.send("✅ Server is running!");
});

// ---------------- START SERVER ----------------
const PORT = process.env.PORT || 3200;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
