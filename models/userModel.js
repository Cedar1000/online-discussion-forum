const mongoose = require('mongoose');
const slugify = require('slugify');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: [true, 'A user must have an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please Provide a valid email'],
  },

  gender: {
    type: String,
    required: true,
    enum: ['male', 'female'],
  },

  avatar: String,

  joined: {
    type: Date,
    default: Date.now(),
  },

  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },

  password: {
    type: String,
    required: true,
    minlength: [8, 'A password should be at least 8 characters'],
    select: false,
  },

  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      validator: function (el) {
        // This only works on CREATE and SAVE!!!
        return el === this.password;
      },

      message: 'Passwords are not the same!',
    },
  },

  active: {
    type: Boolean,
    default: true,
    select: false,
  },

  slug: String,

  passwordChangedAt: Date,
});

//DOCUMENT MIDDLEWARE
userSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  //Hash password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //Delete the passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

//INSTANCE METHODS
userSchema.methods.correctPassword = async function (
  inputedPassword,
  userPassword
) {
  return await bcrypt.compare(inputedPassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimeStamp;
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
