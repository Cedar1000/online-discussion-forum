const factory = require('../controllers/handlerFactory');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const upload = require('../utils/multer');
const cloudinary = require('../utils/cloudinary');

exports.uploadUserAvatar = upload.single('avatar');

const filterObj = (obj, ...allowedFileds) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFileds.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);

exports.getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;
  next();
});

exports.updateMe = catchAsync(async (req, res, next) => {
  //1) Create error if user Posts password data

  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /UpdateMypassword',
        400
      )
    );
  }

  //2) Update user document

  let result;
  if (req.file) {
    result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'Forum',
      public_id: req.user._id,
      overwrite: true,
    });

    req.body.avatar = result.secure_url;
  }

  const filteredBody = filterObj(
    req.body,
    'name',
    'email',
    'username',
    'gender',
    'avatar',
    'cloudinaryId'
  );

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    user: updatedUser,
    result,
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.makeAdmin = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  req.body.role = 'admin';

  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    user,
  });
});
