const express = require('express');
const replyCommentController = require('../controllers/replyCommentController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(replyCommentController.getAllReplies)
  .post(
    authController.protect,
    replyCommentController.setReply,
    replyCommentController.createReply
  );

router
  .route('/:id')
  .get(replyCommentController.getReply)
  .patch(
    authController.protect,
    authController.accessControl,
    replyCommentController.updateReply
  )
  .delete(
    authController.protect,
    authController.accessControl,
    replyCommentController.deleteReply
  );

module.exports = router;
