import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { getMyOrders , changeStatus, getAllOrders,getOrderDetails, deleteOrder} from '../controllers/order.controller.js';

const router = express.Router();

router.get('/', protectRoute, getMyOrders);
router.get('/all', protectRoute, getAllOrders);
router.get('/:orderId', protectRoute, getOrderDetails);
router.put('/:orderId', protectRoute, changeStatus);
router.delete('/:orderId', protectRoute, deleteOrder);

export default router;