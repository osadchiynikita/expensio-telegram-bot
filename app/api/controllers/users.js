'use strict';

const mongoose = require('mongoose');
const { UserModel, UserSettingsModel } = require('../models/user');
const UserBalanceModel = require('../models/balance');

class UsersController {

  /**
   * Add new user
   */

  addUser(req, res) {
    const { user, country } = req.body;

    const newUserSettings = new UserSettingsModel({
      _id: user.id,
      country: {
        name: country.name,
        code: country.code,
        currency: country.currency
      }
    });

    const newUserBalance = new UserBalanceModel({
      _id: user.id,
      incomes: 0,
      expenses: 0
    })

    const newUser = new UserModel({
      _id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      settings: newUserSettings,
      balance: newUserBalance
    });

    newUser.save().then(newUserSettings.save()).then(newUserBalance.save()).then(error => {
      error ? res.send(error) : res.json({ message: 'User created'});
    });
  }

  /**
   * Get user info
   */

  getUser(req, res) {
    const { id } = req.params;

    UserModel.findById(id, (err, user) => {
      err ? res.send(err) : res.json(user);
    });
  }

  /**
   * Get user settings
   */

  getUserSettings(req, res) {
    const { id } = req.params;

    UserSettingsModel.findById(id, (err, userSettings) => {
      err ? res.send(err) : res.json(userSettings);
    });
  }

  /**
   * Update user settings
   */

  updateUserSettings(req, res) {
    const { params: { id }, body: { country } } = req;

    UserSettingsModel.findById(id, (err, userSettings) => {
      if (userSettings) {
        userSettings.country = country;
        userSettings.save((err) => {
          err ? res.send(err) : res.json({ message: 'User settings updated' });
        });
      }
    });
  }
}

module.exports = UsersController;