const mongoose = require('mongoose');
const Post = require('../models/postModel');

const commentSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
      trim: true,
      minlength: [1, 'A comment must have at least 1 character'],
      maxlength: [500, 'A comment should not have more than 300 characters'],
    },

    user: { type: mongoose.Schema.ObjectId, ref: 'User' },

    post: { type: mongoose.Schema.ObjectId, ref: 'Post' },

    likesQuantity: {
      type: Number,
      default: 0,
    },

    replyQuantity: {
      type: Number,
      default: 0,
    },

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

//Virtual populate
commentSchema.virtual('likes', {
  ref: 'LikeComment',
  foreignField: 'comment',
  localField: '_id',
});

commentSchema.virtual('replies', {
  ref: 'ReplyComment',
  foreignField: 'comment',
  localField: '_id',
});

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name, avatar',
  });

  next();
});

commentSchema.statics.calcNumber = async function (postId) {
  const stats = await this.aggregate([
    {
      $match: { post: postId },
    },
    {
      $group: {
        _id: '$post',
        nComments: { $sum: 1 },
      },
    },
  ]);

  // console.log(stats);

  if (stats.length > 0) {
    await Post.findByIdAndUpdate(postId, {
      commentsQuantity: stats[0].nComments,
    });
  } else {
    await Post.findByIdAndUpdate(postId, {
      commentsQuantity: 0,
    });
  }
};

commentSchema.post('save', function () {
  //this always points to the current like
  this.constructor.calcNumber(this.post);
  //post middleware doesn't get access to next
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
