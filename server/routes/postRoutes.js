const express = require('express');
const router = express.Router({ mergeParams: true });

const postController = require('../controllers/postController');
const authController = require('../controllers/authController');
const likeRouter = require('./likeRoutes');
const commentRouter = require('./commentRoutes');

//POST /posts/2334df/likes
//GET /posts/2334df/likes
//GET /posts/2334df/likes/23rehduf

router.use('/:postId/likes', likeRouter);
router.use('/:postId/comments', commentRouter);

// router.use(authController.isLoggedIn);

router
  .route('/')
  .get(postController.getAllPost)
  .post(
    authController.protect,
    authController.setPostId,
    postController.checkCategory,
    postController.createPost
  );

router
  .route('/:id')
  .get(postController.getPost)
  .patch(
    authController.protect,
    authController.accessControl,
    postController.updatePost
  )
  .delete(
    authController.protect,
    authController.accessControl,
    postController.deletePost
  );

module.exports = router;
