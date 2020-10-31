const express = require('express');

const LikeCommentController = require('../controllers/likeCommentController');
const authController = require('../controllers/authController');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    authController.protect,
    LikeCommentController.setCommentId,
    authController.checkUser,
    LikeCommentController.getAllLikes
  )
  .post(
    authController.protect,
    LikeCommentController.setCommentId,
    LikeCommentController.checkUser,
    LikeCommentController.likeComment
  );

router
  .route('/:id')
  .get(LikeCommentController.getOneLike)
  .delete(LikeCommentController.dislikeComment);

module.exports = router;
