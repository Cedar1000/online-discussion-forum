const factory = require('../controllers/handlerFactory');

const WaitingList = require('../models/waitingListModel');

exports.addToWaitingList = factory.createOne(WaitingList);

exports.getWaitingList = factory.getAll(WaitingList);

exports.getWaiting = factory.getOne(WaitingList);
exports.deleteWaiting = factory.deleteOne(WaitingList);
