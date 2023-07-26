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
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());

app.use(express.static("build"));

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

// Handle requests for the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
  });
});
