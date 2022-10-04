'use strict';
const jwt = require('jsonwebtoken');
const HttpStatus = require('http-status');
const useragent = require('useragent');
const requestIp = require('request-ip');
const otherHelper = require('../helper/others.helper');
const loginlogSchema = require('../modules/user/loginlogs/loginlogSchema');
const authMiddleware = {};
authMiddleware.retrieveClientInfo = async (req, res, next) => {
  try {
    let platform = req.headers['platform'];
    if (platform) {
      if (platform == 'android' || platform == 'ios') {
      } else {
        platform = 'web';
      }
    } else {
      platform = 'web';
    }
    req.platform = platform;
    next();
  } catch (err) {
    next(err);
  }
};
authMiddleware.authentication = async (req, res, next) => {
  try {
    const secretOrKey = process.env.SCREAT_CODE;
    let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization || req.headers.token;

    if (token && token.length) {
      token = token.replace('Bearer ', '');
      const d = await jwt.verify(token, secretOrKey);
      req.user = d;
      let passed = await loginlogSchema.findOne({ token, is_active: true });
      if (passed) {
        return next();
      } else {
        return otherHelper.sendResponse(res, HttpStatus.UNAUTHORIZED, false, null, null, 'Session Expired', null);
      }
    }
    return otherHelper.sendResponse(res, HttpStatus.UNAUTHORIZED, false, null, token, 'token not found', null);
  } catch (err) {
    return next(err);
  }
};

authMiddleware.authenticationForLogout = async (req, res, next) => {
  try {
    const secretOrKey = process.env.SCREAT_CODE;
    let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization || req.headers.token;
    if (token && token.length) {
      token = token.replace('Bearer ', '');
      const d = await jwt.verify(token, secretOrKey);
      req.user = d;
      req.token = token;
      return next();
    }
    return otherHelper.sendResponse(res, HttpStatus.UNAUTHORIZED, false, null, token, 'token not found', null);
  } catch (err) {
    return next(err);
  }
};
authMiddleware.getClientInfo = async (req, res, next) => {
  let info = {};
  let agent = useragent.parse(req.headers['user-agent']);
  info.browser = agent.toAgent().toString();
  info.os = agent.os.toString();
  info.device = agent.device.toString();
  info.ip = requestIp.getClientIp(req);
  // on localhost you'll see 127.0.0.1 if you're using IPv4
  // or ::1, ::ffff:127.0.0.1 if you're using IPv6
  req.client_info = info;
  return next();
};

module.exports = authMiddleware;
