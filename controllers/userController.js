const factory = require('../controllers/handlerFactory');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);

exports.getMe = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    user: req.user,
  });
});
