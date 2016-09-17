'use strict';

const NodeGeocoder = require('node-geocoder');
const currenciesData = require('./data/currencies');
const geocoder = NodeGeocoder({ provider: 'google' });

class SettingsModel {
  getCountryCurrency(code) {
    return currenciesData[code];
  }

  getCountryDataByName(name) {
    return new Promise((resolve, reject) => {
      geocoder.geocode(name, (err, res) => {
        if (res) {
          const countryData = this.prepareCountryData(res[0]);
          resolve(countryData);
        }

        reject(err);
      });
    });
  }

  getCountryDataByLocation(location) {
    const { latitude, longitude } = location;

    return new Promise((resolve, reject) => {
      geocoder.reverse({ lat: latitude, lon: longitude }, (err, res) => {
        if (res) {
          const countryData = this.prepareCountryData(res[0]);
          resolve(countryData);
        }

        reject(err);
      });
    });
  }

  prepareCountryData(data) {
    const { country, countryCode } = data;
    const currency = this.getCountryCurrency(countryCode);

    return {
      name: country,
      code: countryCode,
      currency: currency
    };
  }

  getCountryForm(params) {
    return {
      formData: {
        q: params.formMessage,
        error: `I'm not sure you are living there`,
        validator: (message, callback) => {

          if (message.location) {
            this.getCountryDataByLocation(message.location).then(countryData => {
              if (countryData) {
                callback(true, {
                  user: message.from,
                  country: countryData
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
            this.getCountryDataByName(message.text).then(countryData => {
              if (countryData) {
                callback(true, {
                  user: message.from,
                  country: countryData
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
  }
}

module.exports = SettingsModel;
