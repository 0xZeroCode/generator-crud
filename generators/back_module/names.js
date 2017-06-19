const _ = require('lodash');
const utils = require('../utils');

function toRouteName(name) {
  return utils.toPluralForm(_.camelCase(name));
}

function toManagerName(name) {
  return utils.toPluralForm(_.camelCase(name)) + 'Manager';
}

function toModelName(name) {
  return _.upperFirst(_.camelCase(name));
}

function toModelLowerName(name) {
  return _.camelCase(name);
}

function toRepositoryName(name) {
  return utils.toPluralForm(_.camelCase(name)) + 'Repository';
}


module.exports = {
  toRouteName: toRouteName,
  toManagerName: toManagerName,
  toModelName: toModelName,
  toModelLowerName: toModelLowerName,
  toRepositoryName: toRepositoryName
};
