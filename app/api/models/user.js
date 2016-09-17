'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * User Settings Schema
 */

const UserSettingsSchema = new Schema({
  _id: { type: String, ref: 'User' },
  country: {
    name: { type: String },
    code: { type: String },
    currency: { type: String }
  }
});

/**
 * User Schema
 */

const UserSchema = new Schema({
  _id: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true },
  settings: { type : Schema.ObjectId, ref : 'UserSettings' },
  balance: { type : Schema.ObjectId, ref : 'UserBalance' },
});

/**
 * Validations
 */

UserSchema.path('_id').validate((value) => {
  return value.length > 0;
});

module.exports = {
  UserModel: mongoose.model('User', UserSchema),
  UserSettingsModel: mongoose.model('UserSettings', UserSettingsSchema)
};
