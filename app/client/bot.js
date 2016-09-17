'use strict';

const Telegram = require('telegram-node-bot');
const config = require('config');
const Bot = new Telegram.Telegram(config.tokens.telegram);

const StartController = require('./controllers/start');
const SettingsController = require('./controllers/settings');
const BalanceController = require('./controllers/balance');

Bot.router.when(['/start'], new StartController());
Bot.router.when(['/getcountry', '/setcountry'], new SettingsController());
Bot.router.when(['/getbalance', '/addexpense', '/addincome'], new BalanceController());