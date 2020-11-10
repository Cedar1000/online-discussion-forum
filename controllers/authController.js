const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const signToken = require('../utils/signToken');
const Like = require('../models/likeModel');
const Post = require('../models/postModel');
const sendEmail = require('../utils/email');

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  res.status(statusCode).json({
    status: 'success',
    token,
    user,
  });
};

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

  createSendToken(newUser, 201, res);
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
  createSendToken(user, 200, res);
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
  if (!req.body.category) req.body.category = req.params.category;
  next();
};

//CHECK USER ON POST
exports.checkUser = catchAsync(async (req, res, next) => {
  const like = await Like.find({ post: req.body.post, user: req.user.id });
  console.log(like);
  console.log(like.length);

  if (like.length > 0) {
    return next(new AppError('You already liked this post', 401));
  }
  next();
});

exports.accessControl = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  //Find post with the ID in question
  const post = await Post.findById(id);

  // Compare post ID to user ID
  if (post.user._id !== req.user.id) {
    return next(
      new AppError('You are not allowed to perform this action', 403)
    );
  }

  next();
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  //1) Get user based on posted email
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError('There is no user with that email', 404));
  }

  //2) Generate the random rest token
  const resetToken = user.createPassswordResetToken();
  await user.save({ validateBeforeSave: false });

  //3) Send it back as an email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget, please ignore this email!`;

  //Actually send email
  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (Valid only for 10 min)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (error) {
    user.createPassswordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'There was an error sending the email. Try again later!',
        500
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  //1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  console.log(hashedToken);

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  //2) If token  has not expired, and there is user, set new password
  if (!user) {
    return next(new AppError('Token is invalid or has  expired', 400));
  }

  //3) Update changedPasswordAt property for the user
  const { password, passwordConfirm } = req.body;
  user.password = password;
  user.passwordConfirm = passwordConfirm;
  user.passwordResetExpires = undefined;
  user.passwordResetToken = undefined;
  await user.save();

  //4) Log the user in, send JWT to the client
  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  //1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  //2) Chwck if posted password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong', 401));
  }

  //3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  //4) Log user in, send JWT
});
