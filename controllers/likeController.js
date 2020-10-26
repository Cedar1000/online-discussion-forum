const Like = require('../models/likeModel');
const factory = require('../controllers/handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.setPostId = (req, res, next) => {
  //Allow nested routes
  if (!req.body.post) req.body.post = req.params.postId;
  if (!req.body.user) req.body.user = req.user.id;

  next();
};

exports.checkUser = catchAsync(async (req, res, next) => {
  const like = await Like.find({ post: req.body.post, user: req.user.id });

  if (like) {
    return next(new AppError('You already liked this post', 401));
  }
  next();
});

exports.getAllLikes = factory.getAll(Like);
exports.getLike = factory.getOne(Like);
exports.createLike = factory.createOne(Like);
exports.dislike = factory.deleteOne(Like);
