'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * User Schema
 */

const UserSchema = new Schema({
  id: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true },
  settings: {
    country: {
      name: { type: String },
      code: { type: String },
      currency: { type: String }
    }
  },
  balance: {
    incomes: { type: String },
    expenses: { type: String }
  }
});

/**
 * Validations
 */

UserSchema.path('id').validate((value) => {
  return value.length > 0;
});

module.exports = mongoose.model('User', UserSchema);
