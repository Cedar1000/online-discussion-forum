const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    actionUser: { type: mongoose.Schema.ObjectId, ref: 'User' },

    userToNotify: { type: mongoose.Schema.ObjectId, ref: 'User' },

    post: { type: mongoose.Schema.ObjectId, ref: 'Post' },

    read: {
      type: Boolean,
      default: false,
    },

    body: {
      type: String,
      trim: true,
      required: [true, 'A notification must have a body'],
    },

    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
