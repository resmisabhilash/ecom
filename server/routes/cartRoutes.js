import express from 'express';
import { addToCart ,getCart , updateCartItem , removeCartItem} from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected route: Only logged-in users can add items to their cart
router.post('/', protect, addToCart);
router.get('/', protect, getCart);
router.put('/:id', protect, updateCartItem);
router.delete('/:id', protect, removeCartItem);


export default router;
