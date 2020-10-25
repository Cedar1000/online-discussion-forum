const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema(
  {
    user: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    post: [{ type: mongoose.Schema.ObjectId, ref: 'Post' }],
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

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
