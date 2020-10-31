const factory = require('./handlerFactory.js');
const replyComment = require('../models/replyCommentModel');

exports.getAllReplies = factory.getAll(replyComment);
exports.getReply = factory.getOne(replyComment);
exports.createReply = factory.createOne(replyComment);
exports.updateReply = factory.updateOne(replyComment);
exports.deleteReply = factory.deleteOne(replyComment);
