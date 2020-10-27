const Post = require('../models/postModel');
const factory = require('../controllers/handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Category = require('../models/categoryModel');

exports.setSlugAndId = (req, res, next) => {
  //Allow nested routes
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.category) req.body.category = req.params.category;
  next();
};

exports.checkCategory = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const category = await Category.findOne({ name: req.body.category });
  if (!category) {
    return next(new AppError('No such category exists', 404));
  }
  next();
});

exports.getAllPost = factory.getAll(Post, {
  path: 'user',
  select: 'name, avatar',
});

exports.getPost = factory.getOne(Post);
exports.createPost = factory.createOne(Post);
exports.updatePost = factory.updateOne(Post);
exports.deletePost = factory.deleteOne(Post);
