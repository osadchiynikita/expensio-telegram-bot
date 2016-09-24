'use strict';

const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;
const SettingsModel = require('../models/settings');
const config = require('config');
const request = require('superagent');

class OtherwiseController extends TelegramBaseController {
  /**
   * @param {Scope} $
   */
  handle($) {
    const { firstName } = $.message.from;
    const messageText = `${firstName}, I'm Expensio and I can help you track your expenses and incomes.\n\nYou can control me by sending these commands:\n\n/addbalance - create new balance\n/showbalance - show current balance\n/switchbalance - switch active balance\n/addexpense - add new expense\n/addincome - add new income\n/stop - stop bot`;
    $.sendMessage(messageText);
  }
}

module.exports = OtherwiseController;