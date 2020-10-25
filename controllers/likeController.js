const Like = require('../models/likeModel');
const factory = require('../controllers/handlerFactory');

exports.getAllLikes = factory.getAll(Like);
exports.getLike = factory.getOne(Like);
exports.createLike = factory.createOne(Like);
exports.dislike = factory.deleteOne(Like);
