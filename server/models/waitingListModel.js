const mongoose = require('mongoose');
const validator = require('validator');

const waitingListSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },

    email: {
      type: String,
      required: [true, 'email is required'],
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, 'Please Provide a valid email'],
    },

    country: {
      type: String,
      required: [true, 'country is required'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const WaitingList = mongoose.model('WaitingList', waitingListSchema);

module.exports = WaitingList;
