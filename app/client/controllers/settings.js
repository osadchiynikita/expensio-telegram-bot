'use strict';

const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;
const SettingsModel = require('../models/settings');
const config = require('config');
const request = require('superagent');

class SettingsController extends TelegramBaseController {

  getCountry($) {
    const { id, firstName } = $.message.from;

    request.get(`${config.env.apiUrl}/user/${id}/settings`)
      .end((err, res) => {
        if (res && res.body) {
          const { country } = res.body;
          $.sendMessage(`${firstName}, here is your current settings:\n\nCountry: <b>${country.name}</b>\nCurrency: <b>${country.currency}</b>.`, {
            parse_mode: 'html'
          });
        } else {
          $.sendMessage(`${firstName}, sorry, something went wrong`);
        }
      });
  }

  setCountry($) {
    const settingsModel = new SettingsModel;
    const countryForm = settingsModel.getCountryForm({
      formMessage: `Please send me your location or tell me your new country name.`
    });

    $.runForm(countryForm, (result) => {
      const { user, country } = result.formData;

      request.put(`${config.env.apiUrl}/user/${user.id}/settings`)
        .send({ user, country })
        .end((err, res) => {
          $.sendMessage(`I've updated your settings with <b>${country.name}</b> as your default country and <b>${country.currency}</b> as default currency.`, {
            parse_mode: 'html'
        });
      });
    });
  }

  get routes() {
    return {
      '/getcountry': 'getCountry',
      '/setcountry': 'setCountry'
    }
  }
}

module.exports = SettingsController;