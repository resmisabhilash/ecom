import Product from '../models/Product.js';

// GET all
export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// GET by ID
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) res.json(product);
  else res.status(404).json({ message: 'Product not found' });
};

// CREATE (Admin)
export const createProduct = async (req, res) => {
  const product = new Product(req.body);
  const created = await product.save();
  res.status(201).json(created);
};

// UPDATE (Admin)
export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  Object.assign(product, req.body);
  const updated = await product.save();
  res.json(updated);
};

// DELETE (Admin)
export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};
