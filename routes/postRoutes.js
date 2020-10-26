const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');
const authController = require('../controllers/authController');
const likeController = require('../controllers/likeController');

router
  .route('/')
  .get(authController.protect, postController.getAllPost)
  .post(authController.protect, postController.createPost);

router
  .route('/:id')
  .get(postController.getPost)
  .patch(postController.updatePost)
  .delete(postController.deletePost);

//POST /posts/2334df/likes
//GET /posts/2334df/likes
//GET /posts/2334df/likes/23rehduf

router
  .route('/:postId/likes')
  .post(
    authController.protect,
    likeController.setPostId,
    likeController.checkUser,
    likeController.createLike
  )
  .get(likeController.getAllLikes);

module.exports = router;
