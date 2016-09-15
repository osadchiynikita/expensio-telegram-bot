'use strict';

const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;
const config = require('config');
const CountriesHelper = require('../helpers/countries');
const countries = new CountriesHelper;
const request = require('superagent');

class StartController extends TelegramBaseController {
  /**
   * @param {Scope} $
   */
  handle($) {
    const { firstName } = $.message.from;

    const startForm = {
      formData: {
        q: `Please send me your location or tell me your country. I'll use this to set your default currency.`,
        error: `${firstName}, I'm not sure you are living there`,
        validator: (message, callback) => {

          if (message.location) {
            countries.getCountryDataByLocation(message.location).then(countryData => {
              if (countryData) {
                callback(true, {
                  user: message.from,
                  settings: {
                    country: countryData
                  }
                });
                return;
              }
            }).catch(error => {
              if (error) {
                callback(false);
              }
            });
          }

          if (message.text) {
            countries.getCountryDataByName(message.text).then(countryData => {
              if (countryData) {
                callback(true, {
                  user: message.from,
                  settings: {
                    country: countryData
                  }
                });
                return;
              }
            }).catch(error => {
              if (error) {
                callback(false);
              }
            })
          }

        }
      }
    };

    $.sendMessage(`Hi, ${firstName}, I'm Expensio and I can help you track your expenses and incomes.`).then(() => {
      $.runForm(startForm, (result) => {
        const { user, settings } = result.formData;

        request.post(`${config.env.apiUrl}/user/add`)
          .send({ user, settings })
          .end((err, res) => {
            $.sendMessage(`Ok, I set <b>${settings.country.name}</b> as your default country and <b>${settings.country.currency}</b> as default currency. You can change this settings later.`, {
              parse_mode: 'html'
            });
          });
      });
    });


  }
}

module.exports = StartController;