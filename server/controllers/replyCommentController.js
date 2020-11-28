const factory = require('./handlerFactory.js');
const replyComment = require('../models/replyCommentModel');

exports.setReply = (req, res, next) => {
  //Allow nested routes
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.comment) req.body.comment = req.params.commentId;
  next();
};

exports.getAllReplies = factory.getAll(replyComment);
exports.getReply = factory.getOne(replyComment);
exports.createReply = factory.createOne(replyComment);
exports.updateReply = factory.updateOne(replyComment);
exports.deleteReply = factory.deleteOne(replyComment);
