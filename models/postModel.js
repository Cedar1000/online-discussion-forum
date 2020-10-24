const mongoose = require('mongoose');

const User = require('./userModel.js');
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
  user_id: String,
  user: Object,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

//DOCUMENT MIDDLEWARE: runs before .save() and create()

postSchema.pre(
  'save',
  catchAsync(async function (next) {
    //Find user with given id
    this.user = await User.findById(this.user_id);

    if (!this.user) {
      return next(new AppError('Could not find a user with that ID', 404));
    }

    // Delete user_id field
    this.user_id = undefined;
    next();
  })
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
