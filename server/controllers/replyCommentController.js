const factory = require('./handlerFactory.js');
const replyComment = require('../models/replyCommentModel');
const catchAsync = require('../utils/catchAsync');

exports.setReply = (req, res, next) => {
  //Allow nested routes
  console.log(req.user);
  if (!req.body.user) req.body.user = req.user;
  if (!req.body.comment) req.body.comment = req.params.commentId;
  next();
};

exports.getAllReplies = catchAsync(async (req, res, next) => {
  const comments = await replyComment.find().sort('-CreatedAt');

  res.status(200).json({
    status: 'Success',
    comments,
  });
});

exports.getReply = factory.getOne(replyComment);
exports.createReply = factory.createOne(replyComment);
exports.updateReply = factory.updateOne(replyComment);
exports.deleteReply = factory.deleteOne(replyComment);
