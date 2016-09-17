'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * User Balance Schema
 */

const UserBalanceSchema = new Schema({
  _id: { type: String, ref: 'User' },
  incomes: { type: Number },
  expenses: { type: Number }
});

/**
 * Validations
 */

UserBalanceSchema.path('_id').validate((value) => {
  return value.length > 0;
});

module.exports = mongoose.model('UserBalance', UserBalanceSchema)
