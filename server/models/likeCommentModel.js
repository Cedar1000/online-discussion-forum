const mongoose = require('mongoose');
const Comment = require('../models/commentModel');

const likeCommentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },

    comment: { type: mongoose.Schema.ObjectId, ref: 'Comment' },

    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

likeCommentSchema.statics.calcNumber = async function (commentId) {
  const stats = await this.aggregate([
    {
      $match: { comment: commentId },
    },
    {
      $group: {
        _id: '$comment',
        nLikes: { $sum: 1 },
      },
    },
  ]);

  if (stats.length > 0) {
    await Comment.findByIdAndUpdate(commentId, {
      likesQuantity: stats[0].nLikes,
    });
  } else {
    await Comment.findByIdAndUpdate(commentId, {
      likesQuantity: 0,
    });
  }
};

likeCommentSchema.post('save', function () {
  //this always points to the current like
  this.constructor.calcNumber(this.comment);
  //post middleware doesn't get access to next
});

const LikeComment = mongoose.model('LikeComment', likeCommentSchema);

module.exports = LikeComment;
