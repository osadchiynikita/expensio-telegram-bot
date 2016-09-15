'use strict';

const mongoose = require('mongoose');
const router = require('express').Router();
const UsersController = require('../controllers/users');

const users = new UsersController;

/**
 * User routes
 */

// get api/user
router.post('/add', users.add);

// get api/user/:id
router.get('/:id', users.get);

module.exports = router;