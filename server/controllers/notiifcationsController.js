const Notification = require('../models/notificationModel');
const factory = require('../controllers/handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.getAllNotifications = factory.getAll(Notification);
exports.getNotification = factory.getOne(Notification);

exports.getUserNotifications = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  //Find Notifications for particular User
  const notifications = await Notification.find({ userToNotify: userId }).sort(
    '-createdAt'
  );

  res.status(200).json({
    status: 'Success',
    results: notifications.length,
    notifications,
  });
});

exports.markRead = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const notification = await Notification.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!notification) {
    return next(new AppError('No Notification found with that ID', 404));
  }

  res.status(200).json({
    status: 'Success',
    notification,
  });
});
