const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
      trim: true,
      maxlength: [500, 'A post should have less than 500 characters'],
      minlength: [1, 'A post should be at least 1 character long'],
    },

    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    category: {
      type: String,
    },

    likesQuantity: {
      type: Number,
      default: 0,
    },

    commentsQuantity: {
      type: Number,
      default: 0,
    },

    createdAt: {
      type: Date,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//Virtual populate
postSchema.virtual('likes', {
  ref: 'Like',
  foreignField: 'post',
  localField: '_id',
});

postSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'post',
  localField: '_id',
});

//DOCUMENT MIDDLEWARE: runs before .save() and create()

postSchema.pre('save', function (next) {
  this.createdAt = Date.now();
  next();
});

//QUERY MIDDLEWARE
postSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name avatar',
  });

  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
