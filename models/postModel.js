const mongoose = require('mongoose');

// const User = require('./userModel.js');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const postSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
    trim: true,
    maxlength: [500, 'A post should have less than 500 characters'],
    minlength: [1, 'A post should be at least 1 character long'],
  },
  user: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

//DOCUMENT MIDDLEWARE: runs before .save() and create()

//QUERY MIDDLEWARE
postSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: '-__v -joined -role -email -gender -slug',
  });

  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
