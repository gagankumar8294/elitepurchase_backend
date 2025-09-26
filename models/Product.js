import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, default: "general" },
    description: { type: String, default: "" },
    mainImage: { type: String, default: "" },
    subImages: [{ type: String }],
    productUrl: { type: String, default: "" }, // 🔗 Amazon/Product link
  },
  { timestamps: true } // ✅ Adds createdAt & updatedAt automatically
);

const Product = mongoose.model("Product", productSchema);

export default Product;
