'use strict';

const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;
const config = require('./config');

const TestController = require('./controllers/TestController');

const Bot = new Telegram.Telegram(config.tokens.telegram);

Bot.router.when(['test'], new TestController());
