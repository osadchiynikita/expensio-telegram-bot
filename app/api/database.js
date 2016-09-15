'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Use native promises
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/expensio');
const database = mongoose.connection;

database.on('error', (err) => {
  console.error('Connection Error:', err.message);
});

database.once('open', () => {
  console.info("Database Connected!");
});
