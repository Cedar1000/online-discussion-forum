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
  console.log(req.file);
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
    try {
      if (!['male.jpg', 'female.jpg'].includes(req.user.avatar)) {
        console.log(req.user);
        await cloudinary.uploader.destroy(req.user.cloudinaryId);
      }

      result = await cloudinary.uploader.upload(req.file.path);
    } catch (error) {
      res.status(500).json({
        status: 'error',
        error,
      });
    }
  }

  req.body.avatar = result.secure_url;
  req.body.cloudinaryId = result.public_id || req.user.cloudinaryId;

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

exports.getImages = catchAsync(async (req, res, next) => {
  res.send('../public/img/users/cake1.png');
});
