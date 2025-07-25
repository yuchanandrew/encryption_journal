CREATE DATABASE encrypt;
USE encrypt;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL UNIQUE,
    username VARCHAR(255) UNIQUE NOT NULL,
    hashed_pw VARCHAR(255) NOT NULL,
    profile_img_url TEXT DEFAULT NULL,
    bio VARCHAR(500) DEFAULT NULL,
    time_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    refresh_token VARCHAR(512) DEFAULT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE posts (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL UNIQUE,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT DEFAULT NULL,
    time_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    emotion VARCHAR(50) DEFAULT NULL,
    privacy_mode BOOLEAN DEFAULT TRUE,
    title TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE post_test (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    image_url TEXT DEFAULT NULL,
    time_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    title TEXT NOT NULL,
    emotion VARCHAR(50) DEFAULT NULL
);

-- Adding some values into TABLE posts for testing purposes:

INSERT INTO posts (user_id, title, content, privacy_mode)
VALUES (1, "Test post", "Hello this is a private post by yuchanandrew.", true);