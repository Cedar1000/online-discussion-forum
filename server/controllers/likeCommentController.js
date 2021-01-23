const LikeComment = require('../models/likeCommentModel');
const factory = require('../controllers/handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.setCommentId = (req, res, next) => {
  //Allow nested routes
  if (!req.body.comment) req.body.comment = req.params.commentId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.checkUser = catchAsync(async (req, res, next) => {
  const like = await LikeComment.find({
    comment: req.body.comment,
    user: req.body.user,
  });

  if (like.length > 0) {
    return next(new AppError('You already liked this comment', 401));
  }
  next();
});

exports.likeComment = factory.createOne(LikeComment);
exports.getAllLikes = factory.getAll(LikeComment);
exports.getOneLike = factory.getOne(LikeComment);
exports.dislikeComment = factory.deleteOne(LikeComment);
