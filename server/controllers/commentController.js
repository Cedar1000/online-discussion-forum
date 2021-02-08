const Comment = require('../models/commentModel');
const factory = require('../controllers/handlerFactory');
const catchAsync = require('../utils/catchAsync');
const Notification = require('../models/notificationModel');
const Post = require('../models/postModel');

exports.setPostId = (req, res, next) => {
  //Allow nested routes
  if (!req.body.post) req.body.post = req.params.postId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.createComment = catchAsync(async (req, res, next) => {
  //Create Comment
  const commentCreated = await Comment.create(req.body);

  const comment = await Comment.findById(commentCreated.id).populate('likes');

  //Get Liked Post
  const { post } = req.body;

  const commentedPost = await Post.findById(post);

  //Construct message
  const message = `${req.user.name} commented your post`;

  // Create Notification
  const notification = await Notification.create({
    actionUser: req.user,
    userToNotify: commentedPost.user,
    body: message,
  });

  res.status(200).json({
    status: 'success',
    comment,
    notification,
  });
});

exports.getComment = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const comment = await Comment.findById(id)
    .populate('replies')
    .populate('likes');

  res.status(200).json({
    status: 'success',
    comment,
  });
});

exports.getAllComments = catchAsync(async (req, res, next) => {
  const comments = await Comment.find()
    .sort('-CreatedAt')
    .populate('likes')
    .populate('replies');

  res.status(200).json({
    status: 'Success',
    comments,
  });
});
exports.updateCommment = factory.updateOne(Comment);
exports.deleteComment = factory.deleteOne(Comment);
