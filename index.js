const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3001;
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const Post = require("./models/Post");
const { PostModel } = require("./models/Post");
app.use(express.static("public/images/"));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "client/build")));

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to database
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
// Attempt to fetch all comments
app.get("/posts", async (req, res) => {
  try {
    // Attempt to fetch all posts from the database
    const posts = await PostModel.find();

    res.setHeader("Content-Type", "application/json");
    // Send the posts data as a JSON response
    res.json(posts);
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error fetching posts:", error);

    // Send an appropriate error response to the client
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// Create a new comment
app.post("/posts", async (req, res) => {
  if (req.body.content === "" || req.body.content == null) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const newComment = await PostModel.create({
      content: req.body.content,
      postId: req.body.postId,
      username: req.body.newUsername,
      imageUrl: req.body.imageUrl,
      score: req.body.score,
    });

    return res.status(201).json({
      message: "Comment created successfully",
      comment: newComment,
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    return res.status(500).json({ error: "Failed to create comment" });
  }
});

// Delete comment
app.delete("/posts/:commentId", async (req, res) => {
  const { commentId } = req.params;
  try {
    await PostModel.findByIdAndDelete(commentId);
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Failed to delete comment" });
  }
});
// Handle requests for the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
  });
});
