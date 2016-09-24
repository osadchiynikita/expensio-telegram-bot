'use strict';

const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;
const config = require('config');
const request = require('superagent');

class StopController extends TelegramBaseController {
  /**
   * @param {Scope} $
   */
  handle($) {
    const { id, firstName } = $.message.from;

    $.runInlineMenu({
      layout: 2,
      method: 'sendMessage', //here you must pass the method name
      params: ['Are you sure you want to clean my memory?'], //here you must pass the parameters for that method
      menu: [
        {
          text: 'Yes',
          callback: () => {
            request.delete(`${config.env.apiUrl}/user/${id}`).end((err, res) => {
              if (err) console.error(err);
              $.sendMessage(`Hello stranger. Let's /start`);
            });
          }
        },
        {
          text: 'No',
          callback: () => {
            $.sendMessage(`${firstName}, I'm Expensio and I can help you track your expenses and incomes.\n\nYou can control me by sending these commands:\n\n/getbalance - show balance\n/addexpense - add new expense\n/addincome - add new income\n/setcountry - update country settings\n/getcountry - show country settings\n/stop - clean my memory`);
          }
        }
      ]
    });
  }
}

module.exports = StopController;