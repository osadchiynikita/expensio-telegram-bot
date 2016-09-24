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

          if (message.text === '/cancel') {
            callback(true);
          }

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

  getBalanceInfoMessage(firstName, balanceData) {
    const { currency, balance, expenses, incomes } = balanceData;
    return `${firstName}, here is your current balance:\n\n<b>${balance} ${currency}</b>\n\n<pre>Expenses: ${expenses} ${currency}\nIncomes: ${incomes} ${currency}</pre>\n\nYou can use /addexpense and /addincome to manage your balance. Use /addbalance to create the new one.`;
  }
}

module.exports = BalanceModel;
