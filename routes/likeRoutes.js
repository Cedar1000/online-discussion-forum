const express = require('express');
const router = express.Router({ mergeParams: true });

const likeController = require('../controllers/likeController');
const authController = require('../controllers/authController');

router
  .route('/')
  .post(
    authController.protect,
    authController.setPostId,
    authController.checkUser,
    likeController.createLike
  )
  .get(likeController.getAllLikes);

router.route('/:id').get(likeController.getLike).delete(likeController.dislike);

module.exports = router;
