const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    post_id: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    contentSnippet: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

module.exports = Post;