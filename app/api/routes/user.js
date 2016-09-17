'use strict';

const router = require('express').Router();
const UsersController = require('../controllers/users');
const BalanceController = require('../controllers/balance');

const users = new UsersController;
const balance = new BalanceController;

/**
 * User routes
 */

// post api/user
router.post('/add', users.addUser);

// get api/user/:id
router.get('/:id', users.getUser);


// get api/user/:id/settings
router.get('/:id/settings', users.getUserSettings);

// put api/user/:id/settings
router.put('/:id/settings', users.updateUserSettings);


// get api/user/:id/balance
router.get('/:id/balance', balance.getUserBalance);

// put api/user/:id/balance/expenses
router.put('/:id/balance/expenses', balance.updateUserExpenses);

// put api/user/:id/balance/incomes
router.put('/:id/balance/incomes', balance.updateUserIncomes);

module.exports = router;