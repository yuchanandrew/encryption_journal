import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Create middleware to verify JWT
export const verifyJWT = (req, res, next) => {
    // Find the headers
    const authHeaders = req.headers.authorization;

    // If none, then return message with status 401
    if(!authHeaders) {
        return res.status(401).json({ message: "Headers not found." });
    }

    // If headers exist, retrieve token
    const token = authHeaders.split(" ")[1];

    try {
        // Decode the token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // BUG FIX: It took me a really long time to realize that userInfo is actually UserInfo
        req.user = decoded.UserInfo; // Set req.user to UserInfo in decoded data

        next(); // Move to next middleware
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }
};