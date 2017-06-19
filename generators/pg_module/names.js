const utils = require('../utils');

exports.toTableName = function (name) {
  return utils.toPluralForm(name);
};
