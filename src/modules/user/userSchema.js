const mongoose = require('mongoose');
const otherHelper = require('../../helper/others.helper');
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    firstName: { type: String, required: true },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    imgUrl: {
      type: String,
    },
    // is_active: { type: Boolean, required: true, default: false },
    isPro: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = USER = mongoose.model('users', userSchema);
