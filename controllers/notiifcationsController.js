const Notification = require('../models/notificationModel');
const factory = require('../controllers/handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.getAllNotifications = factory.getAll(Notification);
exports.getNotification = factory.getOne(Notification);

exports.getUserNotifications = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  //Find Notifications for particular User
  const notifications = await Notification.find({ userToNotify: userId });

  res.status(200).json({
    status: 'Success',
    results: notifications.length,
    notifications,
  });
});
