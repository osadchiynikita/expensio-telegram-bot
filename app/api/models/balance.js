'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * User Balance Schema
 */

const UserBalanceSchema = new Schema({
  userId: { type: String, ref: 'User' },
  currency: { type: String },
  balance: { type: Number },
  incomes: { type: Number },
  expenses: { type: Number }
});

/**
 * Validations
 */

UserBalanceSchema.path('userId').validate(value => {
  return value.length > 0;
});

UserBalanceSchema.path('currency').validate(value => {
  return value && value.length > 0;
})

module.exports = mongoose.model('UserBalance', UserBalanceSchema)
