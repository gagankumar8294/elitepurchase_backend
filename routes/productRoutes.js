import express from "express";
import multer from "multer";
import Product from "../models/Product.js"; // Import Product model

const ProductRouter = express.Router();

// ✅ Setup multer (store files in "uploads/" folder)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ---------------- GET Products with Search & Category Filter ----------------
ProductRouter.get("/", async (req, res) => {
  try {
    // Get query parameters from URL
    const { search, category } = req.query;

    // Build MongoDB filter
    const filter = {};

    if (search) {
      // Case-insensitive search on 'name'
      filter.name = { $regex: search, $options: "i" };
    }

    if (category && category !== "all") {
      filter.category = category;
    }

    const products = await Product.find(filter); // Fetch filtered products
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

ProductRouter.post("/", upload.fields([{ name: "mainImage", maxCount: 1 }, { name: "subImages" }]), async (req, res) => {
  try {
    const { name, price, category, description } = req.body;

    // If file uploaded, take its path, else take provided URL
    const mainImage = req.files["mainImage"]
      ? `/uploads/${req.files["mainImage"][0].filename}`
      : req.body.mainImage;

    // Sub images (files + URLs mixed)
    let subImages = [];
    if (req.files["subImages"]) {
      subImages = req.files["subImages"].map(file => `/uploads/${file.filename}`);
    }
    if (req.body.subImages) {
      const urls = Array.isArray(req.body.subImages) ? req.body.subImages : [req.body.subImages];
      subImages.push(...urls);
    }

    const newProduct = new Product({
      name,
      price,
      category,
      description,
      mainImage,
      subImages,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ---------------- GET Single Product by ID ----------------
ProductRouter.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// ---------------- UPDATE Product by ID ----------------
ProductRouter.put("/:id", async (req, res) => {
  try {
    const { name, price, category } = req.body;

    // Find product by ID and update fields
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, category },
      { new: true, runValidators: true } // return updated doc & validate
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ---------------- DELETE Product by ID ----------------
ProductRouter.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

export default ProductRouter;
