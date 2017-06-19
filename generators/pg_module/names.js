const _ = require('lodash');
const utils = require('../utils');

exports.toTableName = function (name) {
  return utils.toPluralForm(name);
};

exports.toRepositoryName = function (name) {
  return utils.toPluralForm(_.camelCase(name)) + 'Repository';
};
