'use strict';

const mongoose = require('mongoose');
const UserBalanceModel = require('../models/balance');

class BalanceController {

  /**
   * Get user balance
   */

  getUserBalance(req, res) {
    const { id } = req.params;

    UserBalanceModel.findById(id, (err, userBalance) => {
      err ? res.send(err) : res.json(userBalance);
    });
  }

  /**
   * Update user expenses
   */

  updateUserExpenses(req, res) {
    const { params: { id }, body: { expense } } = req;

    UserBalanceModel.findById(id, (err, userBalance) => {
      if (userBalance) {
        userBalance.expenses = userBalance.expenses + expense;
        userBalance.save((err) => {
          err ? res.send(err) : res.json({ message: 'User balance updated' });
        });
      }
    });
  }

  /**
   * Update user incomes
   */

  updateUserIncomes(req, res) {
    const { params: { id }, body: { income } } = req;

    UserBalanceModel.findById(id, (err, userBalance) => {
      if (userBalance) {
        userBalance.incomes = userBalance.incomes + income;
        userBalance.save((err) => {
          err ? res.send(err) : res.json({ message: 'User balance updated' });
        });
      }
    });
  }
}

module.exports = BalanceController;
