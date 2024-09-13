import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { getMyCoupon, getCoupon, createCoupon, validateCoupon, deleteCoupon} from '../controllers/coupon.controller.js';

const router = express.Router();

router.get('/', protectRoute, getMyCoupon)
router.get('/admin', protectRoute, getCoupon)

router.post('/', protectRoute, createCoupon)
router.delete('/:couponId', protectRoute, deleteCoupon)

router.post('/validate', protectRoute, validateCoupon)
export default router;