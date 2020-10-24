const Post = require('../models/postModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllPost = catchAsync(async (req, res, next) => {
  const posts = await Post.find();

  res.status(200).json({
    results: posts.length,
    status: 'success',
    posts,
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findById(id);

  //Check if post exists
  if (!post) {
    return next(new AppError('No post with that ID', 404));
  }

  //Send Response
  res.status(200).json({
    status: 'success',
    post,
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  const newPost = await Post.create(req.body);

  res.status(201).json({
    status: 'success',
    newPost,
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedPost) {
    return next(new AppError('No post with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    updatedPost,
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findByIdAndUpdate(id);

  if (!post) {
    return next(new AppError('No post with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
