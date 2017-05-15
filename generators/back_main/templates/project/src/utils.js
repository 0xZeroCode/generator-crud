const _ = require('lodash');

function getFormattedDate(date) {

  if (!date) return '';

  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  return date.getDate() + '/' + (date.getMonth() +
      1) + '/' + date.getFullYear() + ' ' + ("0" +
      date.getHours()).slice(-2) + ':' + ("0" + date.getMinutes())
    .slice(-2) + ':' + ("0" + date.getSeconds()).slice(-2);

}

function getFormattedDateOnly(date) {

  if (!date) return '';

  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  return date.getDate() + '/' + (date.getMonth() +
    1) + '/' + date.getFullYear();

}

function clearObjectFromNulls(object) {

  let nonNullKeys = Object.keys(object).filter(function(key) {
    return !!object[key]; // boolean not null check
  });

  return _.pick(object, nonNullKeys);

}

module.exports = {
  getFormattedDate: getFormattedDate,
  getFormattedDateOnly: getFormattedDateOnly,
  clearObjectFromNulls: clearObjectFromNulls
};
