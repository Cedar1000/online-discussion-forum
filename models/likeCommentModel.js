const mongoose = require('mongoose');

const likeCommentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    comment: { type: mongoose.Schema.ObjectId, ref: 'Comment' },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const LikeComment = mongoose.model('LikeComment', likeCommentSchema);

module.exports = LikeComment;
