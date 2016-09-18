'use strict';

const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;
const SettingsModel = require('../models/settings');
const config = require('config');
const request = require('superagent');

class StartController extends TelegramBaseController {
  /**
   * @param {Scope} $
   */
  handle($) {
    const { firstName } = $.message.from;
    const settingsModel = new SettingsModel;
    const countryForm = settingsModel.getCountryForm({
      formMessage: `Please send me your location or tell me your country. I'll use this to set your default currency.`
    });

    $.sendMessage(`Hi, ${firstName}, I'm Expensio and I can help you track your expenses and incomes.`).then(() => {
      $.runForm(countryForm, (result) => {
        const { user, country } = result.formData;

        request.post(`${config.env.apiUrl}/user/add`)
          .send({ user, country })
          .end((err, res) => {
            if (err) console.error(err);
            if (res.body && res.body.settings) {
              const { country } = res.body.settings;
              $.sendMessage(`Ok, I set <b>${country.name}</b> as your default country and <b>${country.currency}</b> as default currency. You can change this settings later.\n\nNow you can add expenses using /addexpense and incomes using /addincome`, {
                parse_mode: 'html'
              });
            }
        });

      });
    });
  }
}

module.exports = StartController;