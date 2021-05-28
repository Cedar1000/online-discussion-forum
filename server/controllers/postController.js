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

  if (!category) return next(new AppError('No such category exists', 404));

  next();
});

exports.getAllPost = catchAsync(async (req, res, next) => {
  let categoryObj = {};

  if (req.params.category) categoryObj.category = req.params.category;

  //Pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;
  const numDocs = await Post.countDocuments(categoryObj);
  console.log(categoryObj);
  console.log(numDocs);
  const pages = Math.ceil(numDocs / limit);

  const results = await Post.find(categoryObj)
    .sort('-createdAt')
    .skip(skip)
    .limit(limit)
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
    })
    .populate({
      path: 'likes',
    });

  const posts = results.sort((a, b) => a.createdAt - b.createdAt);

  res.status(200).json({
    results: posts.length,
    pages,
    status: 'success',
    posts,
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findById(id)
    .populate('likes')
    .populate({
      path: 'comments',
      populate: [{ path: 'likes' }, { path: 'replies' }, { path: 'user' }],
    });

  if (!post) return next(new AppError('No Post with that ID', 404));

  res.status(200).json({
    status: 'Success',
    post,
  });
});

exports.createPost = async (post) => {
  const postCreated = await Post.create(post);

  const postGotBack = await Post.findById(postCreated.id).populate('likes');

  return postGotBack;
};

exports.updatePost = catchAsync(async (req, res, next) => {
  const postUpdated = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  const postGotBack = await Post.findById(postUpdated.id).populate('likes');

  res.status(201).json({
    status: 'Success',
    postGotBack,
  });
});

exports.deletePost = factory.deleteOne(Post);
