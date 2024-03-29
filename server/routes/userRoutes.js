const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);

router.patch(
  '/updateMe',
  authController.protect,
  userController.uploadUserAvatar,
  userController.updateMe
);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

router.route('/').get(userController.getUsers);

router.get(
  '/me',
  authController.protect,
  userController.getMe,
  userController.getUser
);

router.route('/:id').get(userController.getUser);
router.patch('/:id/makeAdmin', userController.makeAdmin);

module.exports = router;
