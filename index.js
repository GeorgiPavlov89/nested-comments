const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const PostModel = require('./models/PostModel');
const ReplyModel = require('./models/ReplyModel');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.static("public/images/"));


// Connect to the database
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1)
  }
};

// Fetch all comments
app.get("/posts", async (req, res) => {
  try {
    const posts = await PostModel.find()
    res.json(posts);
    console.log(posts);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});


// Fetch all replies for a specific comment
app.get("/posts/:commentId/replies", async (req, res) => {
  const { commentId } = req.params;
  try {
    const replies = await ReplyModel.find({ commentId });
    res.json(replies);
  } catch (error) {
    console.error("Error fetching replies:", error);
    res.status(500).json({ error: "Failed to fetch replies" });
  }
});

// Create a new comment
app.post("/posts", async (req, res) => {
  try {
    const { content, username, imageUrl, score } = req.body;
    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }
    const newComment = await PostModel.create({ content, username, imageUrl, score });
    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Failed to create comment" });
  }
});



// Create a new reply for a specific comment
app.post("/posts/:commentId/replies", async (req, res) => {
  const { commentId } = req.params;
  try {
    const newReply = await ReplyModel.create({
      content: req.body.content,
      username: req.body.username,
      commentId: commentId,
      replyingTo: req.body.replyingTo,
    });
    res.status(201).json(newReply);
  } catch (error) {
    console.error("Error creating reply:", error);
    res.status(500).json({ error: "Failed to create reply" });
  }
});

// Update a comment
app.put("/posts/:commentId", async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body

  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }

  try {
    const updatedPost = await PostModel.findByIdAndUpdate(
      commentId,
      { content }, 
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(updatedPost)
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Failed to update post" });
  }
});



// Delete a comment
app.delete("/posts/:postId", async (req, res) => {
  const { postId } = req.params;
  try {
    await PostModel.findByIdAndDelete(postId);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Failed to delete post" });
  }
});


// Delete a reply
app.delete("/replies/:replyId", async (req, res) => {
  const { replyId } = req.params;
  try {
    await ReplyModel.findByIdAndDelete(replyId);
    res.json({ message: "Reply deleted successfully" });
  } catch (error) {
    console.error("Error deleting reply:", error);
    res.status(500).json({ error: "Failed to delete reply" });
  }
});

// Serve the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
});
