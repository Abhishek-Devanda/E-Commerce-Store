import express from 'express';
import { getAllProducts, getFeaturedProduct, createProduct, deleteProduct, getProductsByCategory, toggleFeaturedProduct } from '../controllers/product.controller.js';
import { adminRoute, protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', protectRoute, adminRoute, getAllProducts);
router.post('/createProduct', protectRoute, adminRoute, createProduct);
router.put('/toggleFeatured/:id', protectRoute, adminRoute, toggleFeaturedProduct);
//update product remaining
router.delete('/:id', protectRoute, adminRoute, deleteProduct);

router.get('/featured', getFeaturedProduct);
router.get('/category/:id', getProductsByCategory);



export default router;