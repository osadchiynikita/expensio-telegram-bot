'use strict';

const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;
const request = require('superagent');
const config = require('config');

class SettingsController extends TelegramBaseController {
  /**
   * @param {Scope} $
   */
  handle($) {
    const { id, firstName } = $.message.from;

    request.get(`${config.env.apiUrl}/user/${id}`)
      .end((err, res) => {
        if (err) {
          $.sendMessage(`${firstName}, sorry, something went wrong`);
        }
        const { settings } = res.body;
        $.sendMessage(`${firstName}, here is your current settings:\n\nCountry: <b>${settings.country.name}</b>\nCurrency: <b>${settings.country.currency}</b>.`, {
          parse_mode: 'html'
        });
      });
  }
}

module.exports = SettingsController;