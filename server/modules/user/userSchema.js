const mongoose = require('mongoose');
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
    },
    email: {
      type: String,
    },
    imgUrl: {
      type: String,
    },

    isPro: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, autoIndex: true, optimisticConcurrency: true },
);

module.exports = USER = mongoose.model('users', userSchema);
