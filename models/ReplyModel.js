const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReplySchema = new Schema({
  content: String,
  username: String,
  commentId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  replyingTo: String,
});

const ReplyModel = mongoose.model('Reply', ReplySchema);
module.exports = ReplyModel;
