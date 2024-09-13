import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../Models/user.model.js";
import { generateTokens } from "../lib/jwt.js";

dotenv.config();

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const user = new User({ name, email, password });
    await user.save();

    //authenticating user

    const { refreshToken, accessToken } = generateTokens(user._id);
    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "strict",
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, //15 minutes
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "strict",
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        cartItems: user.cartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All Fields are Required" })
    }
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Invalid Email" })
    }

    const isPasswordMatch = await user.comparePassword(password)
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid Password" })
    }
    const { refreshToken, accessToken } = generateTokens(user._id);
    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "strict",
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, //15 minutes
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "strict",
    });
    res.status(200).json({
      message: 'Login Success',
      user: { _id: user._id, email: user.email, name: user.name, role: user.role , cartItems: user.cartItems} })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message })

  }

};

export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.status(400).json({ message: "User not logged in" });

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (!decoded) return res.status(400).json({ message: "Invalid token" });

    const user = await User.findById(decoded.userId);
    if (!user) return res.status(400).json({ message: "User not found" });

    user.refreshToken = undefined;
    await user.save();

    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    res.status(200).json({ message: "User logged out successfully" });


  } catch (error) {
    console.log(error);
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.status(400).json({ message: "User not logged in" });

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (!decoded) return res.status(400).json({ message: "Invalid token" });

    const user = await User.findById(decoded.userId);
    if (!user) return res.status(400).json({ message: "User not found" });

    if (refreshToken !== user.refreshToken) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const { refreshToken: newRefreshToken, accessToken } = generateTokens(user._id);


    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "strict",
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, //15 minutes
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "strict",
    });

    res.status(200).json({ message: "Token refreshed successfully" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

export const getProfile = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    console.log(error);
    return res.status(500).json
    
  }
}

export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.email !== email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: "Email Already Exists" });
      }
    }
    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();
    return res.status(200).json({
      message: "Profile Updated Successfully",
      user: { _id: user._id, email: user.email, name: user.name, role: user.role , cartItems: user.cartItems} });
    

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
