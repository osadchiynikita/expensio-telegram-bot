'use strict';

const _ = require('lodash');

class BalanceModel {
  getBalanceForm(params) {
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
}

module.exports = BalanceModel;
