import express from "express";

const ProductRouter = express.Router();

// ✅ Dummy products (later we replace with MongoDB)
const products = [
  { id: 1, name: "Laptop", price: 55000 },
  { id: 2, name: "Headphones", price: 2000 },
  { id: 3, name: "Shoes", price: 33000 },
];

ProductRouter.get("/", (req, res) => {
  res.json(products);
});

ProductRouter.post("/", (req, res) => {
  const { name, price } = req.body;
  const newProduct = {
    id: products.length + 1,
    name,
    price,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

export default ProductRouter;
