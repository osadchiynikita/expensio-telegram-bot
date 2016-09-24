'use strict';

const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;
const BalanceModel = require('../models/balance');
const config = require('config');
const request = require('superagent');

class BalanceController extends TelegramBaseController {

  /**
    * Create new balance
    * @param {Scope} $
   */
  addBalance($) {
    const { id, firstName } = $.message.from;
    const balanceModel = new BalanceModel;
    const currencyForm = balanceModel.getBalanceCurrencyForm({
      formMessage: `What currency do you want to use? I understand UAH, USD, EUR, etc.`,
      formError: `Not sure this is correct currency value, please try again or /cancel`
    });

    $.runForm(currencyForm, (result) => {
      const { currency } = result.formData;

      if (currency) {
        request.post(`${config.env.apiUrl}/user/${id}/balance/add`).send({ currency }).end((err, res) => {
          if (err) {
            console.error(err);
            $.sendMessage(`Sorry, something went wrong`);
          }

          if (res.body) {
            $.sendMessage(`I created new balance for your.\n\nCheck it /showbalance`);
          }
        });
      }

    });
  }

  /**
    * Get balance
    * @param {Scope} $
   */
  showBalance($) {
    const { id, firstName } = $.message.from;

    request.get(`${config.env.apiUrl}/user/${id}/balance/active`).end((err, res) => {
      if (res && res.body) {
        const balanceModel = new BalanceModel;
        const balanceMessage = balanceModel.getBalanceInfoMessage(firstName, res.body);
        $.sendMessage(balanceMessage, { parse_mode: 'html' });
      } else {
        $.sendMessage(`${firstName}, sorry, something went wrong`);
      }
    });
  }

  /**
    * Switch to another balance
    * @param {Scope} $
   */
  switchBalance($) {
    const { id, firstName } = $.message.from;

    request.get(`${config.env.apiUrl}/user/${id}/balances`).end((err, res) => {
      if (res && res.body) {

        const balanceMenu = res.body.map(balance => {
          return {
            text: `${balance.balance} ${balance.currency}`,
            callback: () => {
              request.put(`${config.env.apiUrl}/user/${id}`).send({ balance }).end((err, res) => {
                if (err) console.error(err);
                if (res && res.body) {
                  const balanceModel = new BalanceModel;
                  const balanceMessage = balanceModel.getBalanceInfoMessage(firstName, res.body.balance);
                  $.sendMessage(balanceMessage, { parse_mode: 'html' });
                }
              });
            }
          };
        });

        $.runInlineMenu({
          layout: 2,
          method: 'sendMessage',
          params: ['Which balance do you want to use?'],
          menu: balanceMenu
        });
      }
    });
  }

  /**
    * Add expense
    * @param {Scope} $
   */
  addExpense($) {
    const { id, firstName } = $.message.from;
    const balanceModel = new BalanceModel;

    const expenseForm = balanceModel.getBalanceUpdateForm({
      formMessage: `How much did you spent?`,
      formError: `I think this is incorrect expense value`
    });

    $.runForm(expenseForm, (result) => {
      const { user, value } = result.formData;
      const expense = value;

      request.put(`${config.env.apiUrl}/user/${user.id}/balance/expenses`).send({ user, expense }).end((err, res) => {
        $.sendMessage(`Expense added, you can check your balance using /showbalance`);
      });
    });
  }

  /**
    * Add income
    * @param {Scope} $
   */
  addIncome($) {
    const { id, firstName } = $.message.from;
    const balanceModel = new BalanceModel;

    const incomeForm = balanceModel.getBalanceUpdateForm({
      formMessage: `How much did you earn?`,
      formError: `I think this is incorrect income value`
    });

    $.runForm(incomeForm, (result) => {
      const { user, value } = result.formData;
      const income = value;

      request.put(`${config.env.apiUrl}/user/${user.id}/balance/incomes`)
        .send({ user, income })
        .end((err, res) => {
          $.sendMessage(`Income added, you can check your balance using /showbalance`);
      });
    });
  }

  get routes() {
    return {
      '/addbalance': 'addBalance',
      '/showbalance': 'showBalance',
      '/switchbalance': 'switchBalance',
      '/addexpense': 'addExpense',
      '/addincome': 'addIncome'
    }
  }
}

module.exports = BalanceController;