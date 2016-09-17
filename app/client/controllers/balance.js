'use strict';

const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;
const BalanceModel = require('../models/balance');
const config = require('config');
const request = require('superagent');

class BalanceController extends TelegramBaseController {

  /**
    * Get balance
    * @param {Scope} $
   */
  getBalance($) {
    const { id, firstName } = $.message.from;

    request.get(`${config.env.apiUrl}/user/${id}/settings`).end((error, settings) => {
      if (settings && settings.body) {
        const { country } = settings.body;

        request.get(`${config.env.apiUrl}/user/${id}/balance`).end((error, balance) => {
          if (balance && balance.body) {
            const { expenses, incomes } = balance.body;
            $.sendMessage(`${firstName}, here is your current balance:\n\nExpenses: <b>${expenses} ${country.currency}</b>\nIncomes: <b>${incomes} ${country.currency}</b>.`, {
              parse_mode: 'html'
            });
          } else {
            $.sendMessage(`${firstName}, sorry, something went wrong`);
          }
        });
      } else {
        $.sendMessage(`${firstName}, sorry, something went wrong`);
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

    const expenseForm = balanceModel.getBalanceForm({
      formMessage: `How much did you spent?`,
      formError: `I think this is incorrect expense value`
    });

    $.runForm(expenseForm, (result) => {
      const { user, value } = result.formData;
      const expense = value;

      request.put(`${config.env.apiUrl}/user/${user.id}/balance/expenses`)
        .send({ user, expense })
        .end((err, res) => {
          $.sendMessage(`Expense added, you can check your balance by /getbalance`);
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

    const incomeForm = balanceModel.getBalanceForm({
      formMessage: `How much did you earn?`,
      formError: `I think this is incorrect income value`
    });

    $.runForm(incomeForm, (result) => {
      const { user, value } = result.formData;
      const income = value;

      request.put(`${config.env.apiUrl}/user/${user.id}/balance/incomes`)
        .send({ user, income })
        .end((err, res) => {
          $.sendMessage(`Income added, you can check your balance by /getbalance`);
      });
    });
  }

  get routes() {
    return {
      '/getbalance': 'getBalance',
      '/addexpense': 'addExpense',
      '/addincome': 'addIncome'
    }
  }
}

module.exports = BalanceController;