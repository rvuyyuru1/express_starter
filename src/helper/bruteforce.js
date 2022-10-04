const ExpressBrute = require('express-brute');
const MongooseStore = require('express-brute-mongoose');
const BruteForceSchema = require('express-brute-mongoose/dist/schema');
const mongoose = require('mongoose');
const model = mongoose.model('bruteforce', new mongoose.Schema(BruteForceSchema));
const store = new MongooseStore(model);
const bruteforce = new ExpressBrute(store, {
  freeRetries: 5,
  minWait: 5 * 60 * 1000, // 5 minutes
  maxWait: 60 * 60 * 1000, // 1 hour,
});

module.exports = bruteforce;
