import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mysql from "mysql2";
import jwt from "jsonwebtoken";

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
    const {username, plain_pw} = req.body;
    const rounds = 10;

    try {
        const salt = await bcrypt.genSalt(rounds);
        const hashed_pw = await bcrypt.hash(plain_pw, salt);

        const insert_query = `INSERT INTO users(username, hashed_pw) VALUES (?, ?)`;
        await pool.query(insert_query, [username, hashed_pw]);

        const get_user = `SELECT * FROM users WHERE username = ?`;
        const [result] = await pool.query(get_user, [username]);

        return res.status(201).json({ message: "New user created successfully!", user: result});
    } catch (error) {
        console.error(error);

        return res.status(500).json({ message: "Something went wrong in the server." });
    }
});

app.post("/login", async(req, res) => {
    const {username, plain_pw} = req.params;

    const search_query = `SELECT * FROM users WHERE username = ?`;
    const [result] = await pool.query(search_query, [username]);

    const user = result[0];

    const compare = await bcrypt.compare(plain_pw, user.hashed_pw);

    if (compare === true) {
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "id": user.id,
                    "username": username,
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1hr" }
        );

        const refreshToken = jwt.sign(
            {"id": user.id},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: "1d"}
        );

        // TODO: Add an update query to add the refresh token to user entity.
    }
});


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));