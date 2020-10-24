const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const signToken = require('../utils/signToken');

exports.signup = catchAsync(async (req, res, next) => {
  const userData = { ...req.body };
  const { name, email, password, passwordConfirm, gender } = userData;
  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    gender,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'Created',
    token,
    newUser,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //1) check if email or password was passed in
  if (!email || !password) {
    return next(new AppError('Pleae Provide email and password!', 400));
  }

  //2) Check if  user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new AppError('No User with that email', 404));
  }

  //Check if inputed password is correct
  const correct = await user.correctPassword(password, user.password);

  if (!correct) {
    return next(new AppError('Incorrect email or password', 401));
  }

  //3) If everything is ok, send token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});
