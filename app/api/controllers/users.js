'use strict';

const mongoose = require('mongoose');
const UserModel = require('../models/user');

class UsersController {

  /**
   * Add new user
   */

  add(req, res) {
    const { user, settings } = req.body;

    UserModel.findOne({ id: user.id }, (err, oldUser) => {

      if (oldUser) {
        oldUser.settings = settings;
        oldUser.save((err) => {
          err ? res.send(err) : res.json({ message: 'User added' });
        });
      } else {
        const newUser = new UserModel({
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username,
          settings: {
            country: {
              name: settings.country.name,
              code: settings.country.code,
              currency: settings.country.currency
            }
          },
          balance: {
            incomes: 0,
            expenses: 0
          }
        });

        newUser.save((err) => {
          err ? res.send(err) : res.json({ message: 'User added' });
        });
      }
    });
  }

  /**
   * Get user info
   */

  get(req, res) {
    const { id } = req.params;

    UserModel.findOne({ id: id }, (err, user) => {
      err ? res.send(err) : res.json(user);
    });
  }
}

module.exports = UsersController;