'use strict';

const mongoose = require('mongoose');
const UserModel = require('../models//user');
const UserBalanceModel = require('../models/balance');

class BalanceController {

  /**
   * Create user balance
   */

  addUserBalance(req, res) {
    const { id } = req.params;
    const { currency } = req.body;

    const newBalance = new UserBalanceModel({
      userId: id,
      currency: currency,
      incomes: 0,
      expenses: 0,
      balance: 0
    });

    UserModel.findOne({ userId: id }, (err, user) => {
      newBalance.save((err) => {
        if (err) res.send(err);
        if (user) {
          user.balances = [...user.balances, newBalance];
          user.settings.activeBalanceId = newBalance;
          user.save();
          res.json({ message: 'New user balance created'});
        }
      });
    });
  }

  /**
   * Get user active balance
   */

  getUserActiveBalance(req, res) {
    const { id } = req.params;

    UserModel.findOne({ userId: id }, (err, user) => {
      if (user) {
        UserBalanceModel.findOne({ userId: id, _id: user.settings.activeBalanceId }, (err, userBalance) => {
          err || !userBalance ? res.status(404).send(err || 'Not found') : res.json(userBalance);
        });
      }
    });
  }

  /**
   * Get user balances list
   */

  getUserBalances(req, res) {
    const { id } = req.params;

    UserBalanceModel.find({ userId: id }, (err, userBalances) => {
      err || !userBalances ? res.status(404).send(err || 'Not found') : res.json(userBalances);
    });
  }

  /**
   * Update user expenses
   */

  updateUserExpenses(req, res) {
    const { params: { id }, body: { expense } } = req;

    UserModel.findOne({ userId: id }, (err, user) => {
      UserBalanceModel.findOne({ userId: id, _id: user.settings.activeBalanceId }, (err, userBalance) => {
        if (userBalance) {
          userBalance.expenses = userBalance.expenses + expense;
          userBalance.balance = userBalance.balance - expense;

          userBalance.save((err) => {
            err ? res.send(err) : res.json({ message: 'User balance updated' });
          });
        }
      });
    });
  }

  /**
   * Update user incomes
   */

  updateUserIncomes(req, res) {
    const { params: { id }, body: { income } } = req;

    UserModel.findOne({ userId: id }, (err, user) => {
      UserBalanceModel.findOne({ userId: id, _id: user.settings.activeBalanceId }, (err, userBalance) => {
        if (userBalance) {
          userBalance.incomes = userBalance.incomes + income;
          userBalance.balance = userBalance.balance + income;

          userBalance.save((err) => {
            err ? res.send(err) : res.json({ message: 'User balance updated' });
          });
        }
      });
    });
  }
}

module.exports = BalanceController;
