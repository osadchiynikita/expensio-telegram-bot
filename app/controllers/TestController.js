'use strict';

const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;

class TestController extends TelegramBaseController {
  /**
   * @param {Scope} $
   */
  testHandler($) {
    const { firstName } = $.message.from;
    $.sendMessage(`Hello ${firstName}`);
  }

  get routes() {
    return {
      'test': 'testHandler'
    }
  }
}

module.exports = TestController;