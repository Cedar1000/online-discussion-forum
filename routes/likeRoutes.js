const express = require('express');
const router = express.Router();

const likeController = require('../controllers/likeController');

router
  .route('/')
  .post(likeController.createLike)
  .get(likeController.getAllLikes);

router.route('/:id').get(likeController.getLike).delete(likeController.dislike);

module.exports = router;
