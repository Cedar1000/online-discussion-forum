const multer = require('multer');

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images', 400), false);
  }
};

const multerStorage = multer.diskStorage({});

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

module.exports = upload;
