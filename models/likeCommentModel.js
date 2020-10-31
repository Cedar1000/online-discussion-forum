const mongoose = require('mongoose');

const likeCommentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    comment: { type: mongoose.Schema.ObjectId, ref: 'Comment' },
    createdAt: {
      type: Date,
      default: Date.now()
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const LikeComment = mongoose.model('LikeComment', likeCommentSchema);

module.exports = LikeComment;
