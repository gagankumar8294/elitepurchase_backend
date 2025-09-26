import mongoose from "mongoose";

// Define schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, default: "general" }, // optional, can filter later
  description: { type: String, default: "" },
  mainImage: { type: String, default: "" },   // main image (URL or uploaded file path)
  subImages: [{ type: String }],              // array of sub image URLs/paths
});

// Export model (this creates "products" collection in MongoDB)
const Product = mongoose.model("Product", productSchema);

export default Product;
