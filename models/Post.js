// models.js
const { Schema, model } = require("mongoose");

// Schema for a single reply
const ReplySchema = new Schema({
  content: String,
  username: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Schema for the main post with an array of replies
const PostSchema = new Schema({
  content: String,
  score: Number,
  username: String,
  replyingTo: String,
  imageUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  image: String,
  replies: [ReplySchema], // Nested replies
});

const PostModel = model("Post", PostSchema);
const ReplyModel = model("Reply", ReplySchema);

module.exports = {
  PostModel,
  ReplyModel,
};
