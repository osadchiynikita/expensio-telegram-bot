'use strict';

const mongoose = require('mongoose');
const UserModel = require('../models/user');
const UserBalanceModel = require('../models/balance');

class UsersController {

  /**
   * Add new user
   */

  addUser(req, res) {
    const { user, currency } = req.body;

    const newUserBalance = new UserBalanceModel({
      userId: user.id,
      currency: currency,
      incomes: 0,
      expenses: 0,
      balance: 0
    });

    const newUser = new UserModel({
      userId: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      balances: [newUserBalance],
      settings: {
        activeBalanceId: newUserBalance
      }
    });

    newUser.save().then(newUserBalance.save()).then(error => {
      error ? res.send(error) : res.json({ message: 'User created'});
    });
  }

  /**
   * Get user info
   */

  getUser(req, res) {
    const { id } = req.params;

    UserModel.findOne({ userId: id }, (err, user) => {
      err ? res.send(err) : res.json(user);
    });
  }

  /**
   * Remove user
   */

  removeUser(req, res) {
    const { id } = req.params;

    UserModel.remove({ userId: id }, (err) => {
      if (!err) {
        UserBalanceModel.remove({ userId: id }).exec();
        res.send('User removed');
      }
    });
  }
}

module.exports = UsersController;