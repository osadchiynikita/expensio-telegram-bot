'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * User Schema
 */

const UserSchema = new Schema({
  userId: { type: String, required: true },
  first_name: { type: String },
  last_name: { type: String },
  username: { type: String },
  settings: {
    activeBalanceId: { type : Schema.ObjectId, ref : 'UserBalance' }
  },
  balances: [{ type : Schema.ObjectId, ref : 'UserBalance' }],
});

/**
 * Validations
 */

UserSchema.path('userId').validate((value) => {
  return value.length > 0;
});

module.exports = mongoose.model('User', UserSchema);
