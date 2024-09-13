import jwt from "jsonwebtoken";
import dotenv, { parse } from "dotenv";
dotenv.config();



export function generateTokens (userId) {
    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: 7 * 24 * 60 * 60 * 1, //7 days
    })
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 15 * 60 * 1, //15 minutes
    })
    return { refreshToken, accessToken };
}