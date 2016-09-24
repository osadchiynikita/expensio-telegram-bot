'use strict';

const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;
const BalanceModel = require('../models/balance');
const config = require('config');
const request = require('superagent');

class StartController extends TelegramBaseController {
  /**
   * @param {Scope} $
   */
  handle($) {
    const { id, firstName } = $.message.from;

    request.get(`${config.env.apiUrl}/user/${id}`).end((err, res) => {
      if (err) console.error(err);
      if (res && res.body && res.body.userId) {
        $.sendMessage(`${firstName}, I remember you. You can use /stop to remove your data from my memory.`);
      } else {
        const balanceModel = new BalanceModel;
        const currencyForm = balanceModel.getBalanceCurrencyForm({
          formMessage: `I'm gonna create first balance account for you. What currency do you want to use? I understand UAH, USD, EUR, etc.`,
          formError: `Not sure this is correct currency value, please try again.`
        });

        $.sendMessage(`Hi, ${firstName}, I'm Expensio and I can help you track your expenses and incomes.`).then(() => {
          $.runForm(currencyForm, (result) => {
            const { user, currency } = result.formData;

            request.post(`${config.env.apiUrl}/user/add`)
              .send({ user, currency })
              .end((err, res) => {
                if (err) console.error(err);
                if (res.body && res.body.settings) {
                  const { country } = res.body.settings;
                  $.sendMessage(`Ok, I created first balance account for you.\n\nCheck it /showbalance`, {
                    parse_mode: 'html'
                  });
                }
            });

          });
        });
      }
    });


  }
}

module.exports = StartController;