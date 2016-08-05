var _ = require('lodash');

function toControllerName(name) {
  return _.kebabCase(name) + '-controller';
}

function toFactoryName(name) {
  return _.camelCase(name) + 'Service';
}

function toModuleUpperName(name) {
  return _.upperFirst(_.camelCase(name));
}

function toModuleUrlName(name) {
  return _.camelCase(name) + 's';
}

function toModuleFileName(name) {
  return _.camelCase(name);
}

module.exports = {
  toControllerName: toControllerName,
  toFactoryName: toFactoryName,
  toModuleUpperName: toModuleUpperName,
  toModuleUrlName: toModuleUrlName,
  toModuleFileName: toModuleFileName
};
