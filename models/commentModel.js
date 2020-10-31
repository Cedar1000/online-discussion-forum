const mongoose = require('mongoose');

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

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name, avatar',
  });

  next();
});

//Virtual Populate
commentSchema.virtual('commentLikes', {
  ref: 'LikeComment',
  foreignField: 'comment',
  localField: '_id',
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
