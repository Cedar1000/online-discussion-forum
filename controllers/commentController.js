const Comment = require('../models/commentModel');
const factory = require('../controllers/handlerFactory');

exports.setPostId = (req, res, next) => {
  //Allow nested routes
  if (!req.body.post) req.body.post = req.params.postId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.createComment = factory.createOne(Comment);
exports.getComment = factory.getOne(Comment);
exports.getAllComments = factory.getAll(Comment);
exports.updateCommment = factory.updateOne(Comment);
exports.deleteComment = factory.deleteOne(Comment);
