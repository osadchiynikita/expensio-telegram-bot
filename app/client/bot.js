'use strict';

const Telegram = require('telegram-node-bot');
const config = require('config');
const Bot = new Telegram.Telegram(config.tokens.telegram);

const StartController = require('./controllers/start');
const StopController = require('./controllers/stop');
const SettingsController = require('./controllers/settings');
const BalanceController = require('./controllers/balance');
const OtherwiseController = require('./controllers/otherwise');

Bot.router.when(['/start'], new StartController());
Bot.router.when(['/stop'], new StopController());
Bot.router.when(['/getcountry', '/setcountry'], new SettingsController());
Bot.router.when(['/addbalance', '/showbalance', '/switchbalance', '/addexpense', '/addincome'], new BalanceController());
Bot.router.when(['/cancel'], new OtherwiseController());
Bot.router.otherwise(new OtherwiseController());