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
  const category = await Category.findOne({ name: req.body.category });
  if (!category) {
    return next(new AppError('No such category exists', 404));
  }
  next();
});

exports.getAllPost = catchAsync(async (req, res, next) => {
  let categoryObj = {};

  console.log(req.params.category);
  if (req.params.category) {
    categoryObj.category = req.params.category;
  }

  const posts = await Post.find(categoryObj)
    .sort('-createdAt')
    .populate({
      path: 'comments',
      populate: [
        {
          path: 'replies',
        },
      ],
      populate: [
        {
          path: 'user',
          select: 'name avatar',
        },
      ],
    });

  res.status(200).json({
    results: posts.length,
    status: 'success',
    posts,
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findById(id)
    .populate('likes')
    .populate('comments')
    .populate('replyComment')
    .populate('likeComment');

  if (!post) {
    return next(new AppError('No Post with that ID', 404));
  }

  res.status(200).json({
    status: 'Success',
    post,
  });
});

exports.createPost = factory.createOne(Post);
exports.updatePost = factory.updateOne(Post);
exports.deletePost = factory.deleteOne(Post);
