const Comment = require('../models/commentModel');
const factory = require('../controllers/handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.setPostId = (req, res, next) => {
  //Allow nested routes
  if (!req.body.post) req.body.post = req.params.postId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.createComment = factory.createOne(Comment);
exports.getComment = factory.getOne(Comment);
exports.getAllComments = catchAsync(async (req, res, next) =>{
  const comments = await Comment.find().sort('-CreatedAt').populate('commentLikes');

  res.status(200).json({
    status: 'Success',
    comments
  })
});
exports.updateCommment = factory.updateOne(Comment);
exports.deleteComment = factory.deleteOne(Comment);
