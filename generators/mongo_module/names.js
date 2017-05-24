const _ = require('lodash');

function toModelName(name) {
  return _.upperFirst(_.camelCase(name));
}

function toModelLowerName(name) {
  return _.camelCase(name);
}

function toRepositoryName(name) {
  return _.camelCase(name) + 's' + 'Repository';
}

module.exports = {
  toModelLowerName: toModelLowerName,
  toModelName: toModelName,
  toRepositoryName: toRepositoryName
};
