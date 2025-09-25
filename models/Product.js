import mongoose from "mongoose";

// Define schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

// Export model (this creates "products" collection in MongoDB)
const Product = mongoose.model("Product", productSchema);

export default Product;
