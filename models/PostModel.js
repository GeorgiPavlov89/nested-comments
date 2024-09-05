const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
  content: String,
  score: Number,
  username: String,  
  imageUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  image: String,
}, { collection: 'posts' })

const PostModel = mongoose.model('Post', PostSchema);
module.exports = PostModel;
