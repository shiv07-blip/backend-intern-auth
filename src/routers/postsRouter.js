const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const Post = require("../models/PostsModel");

router.get("/posts", authenticateToken, async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({ posts });
    } catch (error) {
        console.error("Error fetching posts:", error.message);
        res.status(500).json({ message: "Server Error: Unable to fetch posts" });
    }
});

module.exports = router;
