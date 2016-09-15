'use strict';

const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;
const request = require('superagent');
const config = require('config');

class BalanceController extends TelegramBaseController {
  // /**
  //  * @param {Scope} $
  //  */
  // handle($) {
  //   const { id, firstName } = $.message.from;
  //   console.log(id, firstName);

  //   // request.get(`${config.env.apiUrl}/user/${id}`)
  //   //   .end((err, res) => {
  //   //     if (err) {
  //   //       $.sendMessage(`${firstName}, sorry, something went wrong`);
  //   //     }
  //   //     const { settings } = res.body;
  //   //     $.sendMessage(`${firstName}, here is your current settings:\n\nCountry: <b>${settings.country.name}</b>\nCurrency: <b>${settings.country.currency}</b>.`, {
  //   //       parse_mode: 'html'
  //   //     });
  //   //   });
  // }

  /**
    * Add expense
    * @param {Scope} $
   */
  spentHandler($) {
    const { id, firstName } = $.message.from;
    const { sum } = $.query;
    console.log(id, firstName, sum, 1);
  }

  /**
    * Add income
    * @param {Scope} $
   */
  getHandler($) {
    const { id, firstName } = $.message.from;
    const { sum } = $.query;
    console.log(id, firstName, sum, 2);
  }

  get routes() {
    return {
      '/spent :sum': 'spentHandler',
      '/get :sum': 'getHandler',
    }
  }
}

module.exports = BalanceController;