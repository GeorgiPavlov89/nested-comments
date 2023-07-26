const express = require("express");
const path = require("path");
const app = express();
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
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});
const dataBaseUrl = process.env.DATABASE_URL;

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to database
mongoose.connect(dataBaseUrl);

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

app.listen({ port: process.env.PORT });
