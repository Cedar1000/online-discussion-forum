const Post = require('../models/postModel');
const factory = require('../controllers/handlerFactory');

exports.getAllPost = factory.getAll(Post, {
  path: 'user',
  select: 'name, avatar',
});

exports.getPost = factory.getOne(Post);
exports.createPost = factory.createOne(Post);
exports.updatePost = factory.updateOne(Post);
exports.deletePost = factory.deleteOne(Post);
