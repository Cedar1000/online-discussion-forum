const Like = require('../models/likeModel');
const factory = require('../controllers/handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Notification = require('../models/notificationModel');
const Post = require('../models/postModel');

exports.setPostId = (req, res, next) => {
  //Allow nested routes
  if (!req.body.post) req.body.post = req.params.postId;
  if (!req.body.user) req.body.user = req.user.id;

  next();
};

exports.likeAuth = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const like = await Like.findById(id);

  if (req.user._id != like.user.id) {
    return next(
      new AppError('You are not authorized to delete this like', 403)
    );
  }
  next();
});

exports.checkUser = catchAsync(async (req, res, next) => {
  const like = await Like.find({ post: req.body.post, user: req.user.id });

  if (like.length > 0) {
    return next(new AppError('You already liked this post', 401));
  }
  next();
});

exports.createLike = catchAsync(async (req, res, next) => {
  //Create Like
  const like = await Like.create(req.body);

  //Get Liked Post
  const { post } = req.body;
  const likedPost = await Post.findById(post);

  const message = `${req.user.name} liked your post`;

  // Create Notification
  await Notification.create({
    actionUser: req.user,
    userToNotify: likedPost.user,
    body: message,
    post: likedPost._id,
  });

  const likePoped = await Like.findById(like._id);

  res.status(200).json({
    status: 'success',
    likePoped,
  });
});

exports.getAllLikes = factory.getAll(Like);
exports.getLike = factory.getOne(Like);
exports.dislike = factory.deleteOne(Like);
