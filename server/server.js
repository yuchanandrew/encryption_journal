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
    credentials: true
}));

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'encrypt'
}).promise();

{/* SECTION 1: USER REGISTRATION & AUTHENTICATION */}

app.use(express.json());

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

app.get("/get-posts", async(req, res) => {
    const search_query = `SELECT *, DATE_FORMAT(time_created, '%Y-%m-%d') as post_date, DATE_FORMAT(time_created, '%H:%i:%s') as post_time FROM post_test`;
    const [result] = await pool.query(search_query);

    try {
        console.log("result:", result);
        return res.status(200).json({ message: "Posts retrieved successfully", posts: result});
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

app.delete("/remove-post/:id", async(req, res) => {
    const {id} = req.params;

    try {
        const delete_query = `DELETE FROM post_test WHERE id = ?`;
        await pool.query(delete_query, [id]);

        return res.status(200).json({ message: "Post removed successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server issue"});
    }
});

{/* (TEST) SECTION 3: CONNECTION ROUTE TO EMOTIONS ANALYZING MODEL VIA PYTHON API */}

// JS server-side communication with Python script
app.post("/api/emotion", async(req, res) => {
    const {text} = req.body;
    try {
        const response = await fetch("http://localhost:5000/predict", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ text })
        })

        const data = await response.json();

        return res.status(200).json({ js_emotion: data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server issue" });
    }
});

// Route to retrieve all the emotions posted in the day looked up in query
app.get("/emotions-of-the-day", async(req, res) => {
    const { day } = req.query;

    try{
        const search_query = `SELECT emotion FROM post_test WHERE DATE_FORMAT(time_created, '%Y-%m-%d') = ?`;
        const [result] = await pool.query(search_query, [day]);

        return res.status(200).json({ message: `Successfully retrieved ${day} emotions.`, emotions: result });
    } catch (error) {
        return res.status(500).json({ message: "Server issue" });
    }
});

// Route to get all 3 of the most relevant emotions of the day
app.get("/top-emotions-of-the-day", async(req, res) => {
    const { day } = req.query;

    try {
        const search_query = `
        SELECT emotion, COUNT(*) as count 
        FROM POST_TEST WHERE DATE_FORMAT(time_created, '%Y-%m-%d') = ? 
        GROUP BY emotion
        ORDER BY count DESC
        LIMIT 3`;
        const [result] = await pool.query(search_query, [day]);

        res.status(200).json({ message: "Successfully retrieved most frequent emotions.", emotions: result });
    } catch (error) {
        res.status(500).json({ message: "Server issue" });
    }
});

// TODO: Retrieve each post's emotion from database compared to having Python re-compute sentiment analysis

// Update emotions to the database
app.post("/add-emotion", async(req, res) => {
    const { id, emotion } = req.body;

    try {
        const update_query = `UPDATE post_test SET emotion = ? WHERE id = ?`;
        await pool.query(update_query, [emotion, id]);

        return res.status(200).json({ message: "Successfully updated emotions." });
    } catch (error) {
        return res.status(500).json({ message: "Server issue" });
    }
});

// Tagging feature for each emotion
app.get("/api/emotion/:emotion", async(req, res) => {
    const { emotion } = req.params;

    try {
        const get_query = `SELECT *, DATE_FORMAT(time_created, '%Y-%m-%d') as post_date, DATE_FORMAT(time_created, '%H:%i:%s') as post_time FROM post_test where emotion = ?`;
        const [result] = await pool.query(get_query, [emotion]);

        return res.status(200).json({ message: `Details for post_test with emotion = ${emotion} retrieved.`, posts: result});
    } catch (error) {
        return res.status(500).json({ message: "Server issue" });
    }
});

{/* -------------------------------------------* PORT INFO *------------------------------------------------ */}

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));