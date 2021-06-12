const mongoose = require('mongoose');
const Post = require('../models/postModel');

const likeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    post: { type: mongoose.Schema.ObjectId, ref: 'Post' },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

likeSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name avatar',
  });

  next();
});

likeSchema.statics.calcNumber = async function (postId) {
  const stats = await this.aggregate([
    {
      $match: { post: postId },
    },
    {
      $group: {
        _id: '$post',
        nLikes: { $sum: 1 },
      },
    },
  ]);

  if (stats.length > 0) {
    await Post.findByIdAndUpdate(postId, {
      likesQuantity: stats[0].nLikes,
    });
  } else {
    await Post.findByIdAndUpdate(postId, {
      likesQuantity: 0,
    });
  }
};

likeSchema.post('save', function () {
  //this always points to the current like
  this.constructor.calcNumber(this.post);
  //post middleware doesn't get access to next
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
