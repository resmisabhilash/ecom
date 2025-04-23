import Cart from '../models/cartModel.js';
import Product from '../models/Product.js';

const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id; // Assuming you're using JWT and middleware to get user ID

  try {
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({ message: 'Product not found' });
    }

    // Find or create the user's cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if product already in cart
    const existingItem = cart.items.find(item => item.productId.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    // Save the updated cart
    await cart.save();

    res.status(201).json({ message: 'Product added to cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
const getCart = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const cart = await Cart.findOne({ userId }).populate('items.productId');
      if (!cart) {
        return res.status(404).json({ message: 'Cart is empty' });
      }
  
      res.status(200).json({ cart });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
// Fetching cart and populating the product data

  const updateCartItem = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    const userId = req.user.id;
  
    try {
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      const item = cart.items.find(item => item._id.toString() === id);
      if (!item) {
        return res.status(404).json({ message: 'Item not found in cart' });
      }
  
      item.quantity = quantity;
  
      await cart.save();
      res.status(200).json({ message: 'Cart updated', cart });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  const removeCartItem = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
  
    try {
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      cart.items = cart.items.filter(item => item._id.toString() !== id);
      await cart.save();
      
      res.status(200).json({ message: 'Item removed from cart', cart });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };


export { addToCart,getCart,updateCartItem,removeCartItem};
