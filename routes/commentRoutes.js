const express = require('express');
const commentController = require('../controllers/commentController');
const authController = require('../controllers/authController');
const likeCommentRouter = require('./likeCommentRoutes');

const router = express.Router({ mergeParams: true });
//POST /comments/2334df/likes

router.use('/:commentId/likes', likeCommentRouter);

router
  .route('/')
  .post(
    authController.protect,
    commentController.setPostId,
    commentController.createComment
  )
  .get(authController.protect, commentController.getAllComments);

router
  .route('/:id')
  .get(commentController.getComment)
  .patch(authController.protect, commentController.updateCommment);

module.exports = router;
