const factory = require('../controllers/handlerFactory');
const User = require('../models/userModel');

exports.getUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
