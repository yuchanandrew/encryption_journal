import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mysql from "mysql2";
import jwt from "jsonwebtoken";
import { verifyJWT } from "./middleware/verifyJWT.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CLIENT_PATH,
    Credential: true
}));

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'encrypt'
}).promise();

{/* SECTION 1: USER REGISTRATION & AUTHENTICATION */}

app.use(express.json);

app.post("/register", async(req, res) => {
    // Get the username and plain_pw from body
    const {username, plain_pw} = req.body;
    const rounds = 10; // Determine the number of salt rounds necessary

    try {
        // Generate the salt using bcrypt
        const salt = await bcrypt.genSalt(rounds);
        const hashed_pw = await bcrypt.hash(plain_pw, salt); // Hash the password

        // Insert the hashed_pw into user info indatabase
        const insert_query = `INSERT INTO users(username, hashed_pw) VALUES (?, ?)`;
        await pool.query(insert_query, [username, hashed_pw]);

        // Get user (more for testing purposes)
        const get_user = `SELECT * FROM users WHERE username = ?`;
        const [result] = await pool.query(get_user, [username]);

        return res.status(201).json({ message: "New user created successfully!", user: result});
    } catch (error) {
        console.error(error);

        return res.status(500).json({ message: "Something went wrong in the server." });
    }
});

app.post("/login", async(req, res) => {
    try {
        // Retrieve username and plain_pw from body
        const {username, plain_pw} = req.body;

        // Search for the user where username = username from req.body
        const search_query = `SELECT * FROM users WHERE username = ?`;
        const [result] = await pool.query(search_query, [username]);

        // If there is nothing in result, inform client that user by username does not exist
        if (result === null) {
            return res.status(401).json({ message: "User does not exist." });
        }

        // If there exists result, user is the 0th index of result
        const user = result[0];

        // Test the boolean value of comparing the plain_pw to the hashed_pw stored in database
        const compare = await bcrypt.compare(plain_pw, user.hashed_pw);

        // If the boolean returns true, then we create accessTokens and refreshTokens for the user
        if (compare === true) {
            const accessToken = jwt.sign(
                {
                    // Sending over user's id and user's username in the UserInfo package
                    "UserInfo": {
                        "id": user.id,
                        "username": username,
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "1hr" }
            );

            const refreshToken = jwt.sign(
                {
                    "id": user.id,
                    "username": user.username
                },
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn: "1d"}
            );

            // Update the user's refresh token
            const update_query = `UPDATE users SET refresh_token = ? WHERE user_id = ?`;
            await pool.query(update_query, [refreshToken, user.id]);

            // Send over a cookie to client with refreshToken
            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                sameSite: "None",
                secure: true,
                maxAge: 24 * 60 * 60 * 1000,
            });

            res.status(200).json({ message: "Login successful.", access: accessToken});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error with server." });
    }
});

app.get("/profile", verifyJWT, async(req, res) => {
    res.status(200).json({
        message: "Successfully decoded.",
        user: req.user
    });
});

{/* (TEST) SECTION 2: RETRIEVE POSTS & CRUD MODAL FOR POSTS */}

app.get("/collection", async(req, res) => {
    const search_query = `SELECT * FROM post_test`;
    const [result] = await pool.query(search_query);

    try {
        return res.status(200).json({ message: "Posts retrieved successfully", posts: result });
    } catch(error) {
        console.error(error);
        return res.status(500).json({ message: "Server error." });
    }
});

app.post("/create-post", async(req, res) => {
    const {title, content, image_url} = req.body;

    try {
        const insert_query = `INSERT INTO post_test(title, content, image_url) VALUES (?, ?, ?)`;
        const [result] = await pool.query(insert_query, [title, content, image_url]);

        return res.status(201).json({ message: "New post created.", post: result[0] });
    } catch(error) {
        console.error(error);
        return res.status(500).json({ message: "Server issue." });
    }
});

{/* -------------------------------------------* PORT INFO *------------------------------------------------ */}

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));