const mongoose = require('mongoose');
const Comment = require('../models/commentModel');
const User = require('../models/userModel');

const replyCommentSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      trim: true,
      required: [true, 'A reply must have a body'],
    },

    comment: { type: mongoose.Schema.ObjectId, ref: 'Comment' },

    user: { type: Object, required: [true, 'A reply must have a user'] },

    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toObject: { virtuals: true },
    toJson: { virtuals: true },
  }
);

replyCommentSchema.statics.calcNumber = async function (commentId) {
  console.log(commentId);
  const stats = await this.aggregate([
    {
      $match: { comment: commentId },
    },
    {
      $group: {
        _id: '$comment',
        nReplies: { $sum: 1 },
      },
    },
  ]);

  // console.log(stats);

  if (stats.length > 0) {
    await Comment.findByIdAndUpdate(commentId, {
      replyQuantity: stats[0].nReplies,
    });
  } else {
    await Comment.findByIdAndUpdate(postId, {
      replyQuantity: 0,
    });
  }
};

replyCommentSchema.post('save', function () {
  //this always points to the current like
  this.constructor.calcNumber(this.comment);
  //post middleware doesn't get access to next
});

const ReplyComment = mongoose.model('ReplyComment', replyCommentSchema);

module.exports = ReplyComment;
