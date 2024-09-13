import express from "express";
import { signup, login, logout, refreshToken, getProfile, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/refresh-token", refreshToken)
router.get("/profile", protectRoute, getProfile);
router.put("/profile", protectRoute, updateProfile);

// router.get("/check-auth", (req, res) => { 
//     res.json(req.user);
// });


export default router;
