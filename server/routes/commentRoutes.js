const express = require('express');
const commentController = require('../controllers/commentController');
const authController = require('../controllers/authController');
const likeCommentRouter = require('./likeCommentRoutes');
const replyCommentRouter = require('./replyCommentRoutes');

const router = express.Router({ mergeParams: true });
//POST /comments/2334df/likes

router.use('/:commentId/likes', likeCommentRouter);
router.use('/:commentId/reply', replyCommentRouter);

router
  .route('/')
  .post(
    authController.protect,
    commentController.setPostId,
    commentController.createComment
  )
  .get(authController.protect, commentController.getAllComments);

router.use(authController.protect, authController.checkUser);

router
  .route('/:id')
  .get(commentController.getComment)
  .patch(
    authController.protect,
    authController.accessControl,
    commentController.updateCommment
  )
  .delete(
    authController.protect,
    authController.accessControl,
    commentController.updateCommment
  );

module.exports = router;
