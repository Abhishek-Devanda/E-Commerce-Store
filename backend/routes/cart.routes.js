import express from 'express';

import { getCartProducts, addToCart, emptyCart, updateQunatity, removeFromCart } from '../controllers/cart.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', protectRoute, getCartProducts);
router.post('/', protectRoute, addToCart);
router.put('/:id', protectRoute, updateQunatity);
router.delete('/', protectRoute, emptyCart);
router.delete('/:id', protectRoute, removeFromCart);


export default router;