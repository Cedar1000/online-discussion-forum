const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.route('/').get(userController.getUsers);

router.route('/:id').get(userController.getUser);

module.exports = router;
