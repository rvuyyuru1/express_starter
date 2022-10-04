const USER = require('./userSchema');
const bcyrpt = require('bcryptjs');
const userController = {};
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const otherHelper = require('../../helper/others.helper');
const Logger = require('../user/loginlogs/loginlogController');
const httpStatus = require('http-status');
userController.createUser = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  mobile: Joi.string().required(),
  email: Joi.string().email(),
  imgUrl: Joi.string(),
  password: Joi.string().required(),
});
userController.putUser = Joi.object({
  userName: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  imgUrl: Joi.string(),
});
userController.checkUser = Joi.object({
  userName: Joi.string().required(),
  password: Joi.string().required(),
});

userController.addUser = async (req, res, next) => {
  try {
    let { body } = req;
    let salt = bcyrpt.genSaltSync(10);
    let hash = bcyrpt.hashSync(body.password, salt);
    let user = new USER({
      firstName: body.firstName,
      lastName: body.lastName,
      mobile: body.mobile,
      email: body.email,
      imgUrl: body.imgUrl,
      password: hash,
      userName: body.firstName.split(' ').join('').substring(0, 5) + otherHelper.generateRandomHexString(10),
    });
    let result = await user.save();
    var token = jwt.sign(
      {
        id: result._id,
        userName: result.userName,
        firstName: result.firstName,
        lastName: result.lastName,
      },
      `${process.env.SCREAT_CODE}`,
      { expiresIn: '48h' },
    );
    Logger.internal.addloginlog(req, token, next);
    if (result) {
      otherHelper.sendResponse(res, httpStatus.OK, true, null, null, 'User data saved successfully!', token);
    } else {
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Invalid Data', null);
    }
  } catch (error) {
    next(error);
  }
};
userController.getUser = async (req, res, next) => {
  try {
    let { body } = req;
    let user = await USER.findOne({
      $or: [{ userName: body.userName }, { email: body.userName }, { mobile: body.userName }],
    });
    if (user) {
      let isuser = await bcyrpt.compare(body.password, user.password);
      if (isuser) {
        var token = jwt.sign(
          {
            id: result._id,
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
          },
          `${process.env.SCREAT_CODE}`,
          { expiresIn: '48h' },
        );
        Logger.internal.addloginlog(req, token, next);
        otherHelper.sendResponse(res, httpStatus.OK, true, null, null, 'User data obtained successfully!', token);
      } else {
        otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, "Password does't match", null);
      }
    } else {
      otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, 'No user found', null);
    }
  } catch (err) {
    next(err);
  }
};
userController.updateUser = async (req, res, next) => {
  try {
    let { body } = req;
    let user = await USER.findOneAndUpdate(
      {
        $or: [{ userName: body.userName }],
      },
      {
        ...body,
      },
    );
    if (user) {
      res.status(201).json({
        status: 'success',
      });
    } else {
      res.status(400).json({
        status: 'error',
        message: 'User not found!',
      });
    }
  } catch (error) {
    next(error);
  }
};
userController.getUserdetails = async (req, res, next) => {
  try {
    let { user } = req;
    const filter = { _id: user.id };
    let result = await USER.find(filter).select('-password');
    let userinfo = result[0];
    if (userinfo) {
      otherHelper.sendResponse(res, httpStatus.OK, true, { userinfo }, null, 'User data obtained successfully!', null);
    } else {
      otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, "User does't exit", null);
    }
  } catch (error) {
    next(error);
  }
};
// delete user
userController.deleteUser = async (req, res, next) => {
  try {
    let { query } = req;
    let user = await USER.findOneAndDelete({ userName: query.userName });
    if (user) {
      otherHelper.sendResponse(res, httpStatus.OK, true, null, null, 'User data deleted successfully!', null);
    } else {
      otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, "User does't exit", null);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = userController;
