const express = require('express');
const notificationController = require('../controllers/notiifcationsController');

const router = express.Router();

router.route('/').get(notificationController.getAllNotifications);

// router.route('/:id').get(notificationController.getNotification);

router.route('/:userId').get(notificationController.getUserNotifications);

module.exports = router;
