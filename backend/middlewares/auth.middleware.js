import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../Models/user.model.js';

dotenv.config()

export const protectRoute = async (req, res, next) => { 
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) return res.status(401).json({ message: 'Unauthorized - No Access Token' });

        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            if (!decoded) return res.status(401).json({ message: 'Access Token Expired' });
    
            const user = await User.findById(decoded.userId).select('-password');
            if (!user) return res.status(404).json({ message: 'User not found' });
    
            req.user = user;
            next();
        } catch (error) {
            console.log(error);
            return res.status(401).json({ message: 'Unauthorized - Invalid Access Token' });
        }
        
        
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Server Error' });
        
    }
}

export const adminRoute = (req, res, next) => { 
    try {
        if (req.user && req.user.role === 'admin') {
            next();
        } else {
            return res.status(401).json({ message: 'Not authorized - admin only' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });  
        
    }
}