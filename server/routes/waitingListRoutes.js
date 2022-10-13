const express = require('express');

const router = express.Router();

const {
  getWaitingList,
  addToWaitingList,
  getWaiting,
  deleteWaiting,
} = require('../controllers/waitingListController');

router.route('/').get(getWaitingList).post(addToWaitingList);

router.route('/:id').get(getWaiting).delete(deleteWaiting);

module.exports = router;
