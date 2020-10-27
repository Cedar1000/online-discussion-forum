const { promisify } = require('util');
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
    user,
    message: `Welcome back ${user.name}`,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  //1) Getting token and check if its there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  //2) Validate token
  if (!token) {
    return next(
      new AppError('You are not logged in! Please login to get access', 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('The user belonging to the token no longer exists.', 401)
    );
  }

  //4) Check if user changed password after jwt was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please login  again', 401)
    );
  }

  // GRANT ACCESS TO ROUTE
  req.user = currentUser;

  next();
});

//RESTRICT TO ONLY ADMINS
exports.restrictTo = catchAsync(async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next(new AppError('You are not allowed to do this', 401));
  }

  next();
});

//SET POST ID
exports.setPostId = (req, res, next) => {
  //Allow nested routes
  if (!req.body.post) req.body.post = req.params.postId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
