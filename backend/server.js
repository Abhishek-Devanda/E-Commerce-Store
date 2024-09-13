import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';

import ConnectDB from './lib/db.js';
// Importing routes
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';
import couponRoutes from './routes/coupon.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import orderRoutes from './routes/order.routes.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8000;

const _dirname = path.resolve();

app.use(express.json({limit: '5mb'}));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    
}));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/orders', orderRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(_dirname, '/frontend/dist')));

    app.get('*', (_, res) => {
        res.sendFile(path.resolve(_dirname, 'frontend', 'dist', 'index.html'));
    });
}



app.listen(PORT, () => {
    ConnectDB();
    console.log(`Server is running on ${process.env.CLIENT_URL}`);
})