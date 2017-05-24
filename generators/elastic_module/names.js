const _ = require('lodash');

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
  toManagerName: toManagerName,
  toModelName: toModelName,
  toModelLowerName: toModelLowerName,
  toRepositoryName: toRepositoryName
};
