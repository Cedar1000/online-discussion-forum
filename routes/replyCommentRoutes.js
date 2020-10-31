const express = require('express');
const replyCommentController = require('../controllers/replyCommentController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(replyCommentController.getAllReplies)
  .post(replyCommentController.createReply);

router
  .route('/:id')
  .get(replyCommentController.getReply)
  .patch(replyCommentController.updateReply)
  .delete(replyCommentController.deleteReply);

module.exports = router;
