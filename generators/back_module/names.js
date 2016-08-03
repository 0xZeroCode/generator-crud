var _ = require('lodash');

function toRouteName(name) {
  return _.camelCase(name) + 's';
}

function toManagerName(name) {
  return _.camelCase(name) + 's' + 'Manager';
}

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
  toRouteName: toRouteName,
  toManagerName: toManagerName,
  toModelName: toModelName,
  toModelLowerName: toModelLowerName,
  toRepositoryName: toRepositoryName
};



