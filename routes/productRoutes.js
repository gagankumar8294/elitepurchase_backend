import express from "express";
import Product from "../models/Product.js"; // Import Product model

const ProductRouter = express.Router();

// ✅ GET all products (from MongoDB)
ProductRouter.get("/", async (req, res) => {
  try {
    const products = await Product.find(); // fetch from DB
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// ✅ POST a new product (save to MongoDB)
ProductRouter.post("/", async (req, res) => {
  try {
    const { name, price } = req.body;
    const newProduct = new Product({ name, price }); // create doc
    await newProduct.save(); // save to DB
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default ProductRouter;
