'use strict';

const _ = require('lodash');
const currencies = require('./data/currencies');

class BalanceModel {
  getBalanceUpdateForm(params) {
    return {
      formData: {
        q: params.formMessage,
        error: params.formError,
        validator: (message, callback) => {
          const value = Number(parseFloat(message.text).toFixed(2));
          if (value) {
            callback(true, {
              user: message.from,
              value: value
            });
            return;
          }

          callback(false);
        }
      }
    };
  }

  getBalanceCurrencyForm(params) {
    return {
      formData: {
        q: params.formMessage,
        error: params.formError,
        validator: (message, callback) => {
          const currency = this.getCurrency(message.text);
          if (currency) {
            callback(true, {
              user: message.from,
              currency: currency
            });
            return;
          }

          callback(false);
        }
      }
    };
  }

  getCurrency(value) {
    return currencies.find(currency => currency.toLowerCase() === value.toLowerCase());
  }
}

module.exports = BalanceModel;
