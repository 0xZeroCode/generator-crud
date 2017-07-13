const _ = require('lodash');
const utils = require('../utils');

exports.toServiceName = function (name) {
  return _.upperFirst(_.camelCase(name)) + 'Service';
};

exports.toModuleName = function (name) {
  return utils.toPluralForm( _.upperFirst(_.camelCase(name)) ) + 'Module';
};

exports.toComponentName = function (name) {
  return utils.toPluralForm( _.upperFirst(_.camelCase(name)) ) + 'Component';
};

exports.toModel = function (name) {
  return _.camelCase(name);
};

exports.toModelInPlural = function (name) {
  return utils.toPluralForm(_.camelCase(name));
};

exports.toModelUpperName = function (name) {
  return _.upperFirst(_.camelCase(name));
};

exports.toComponentTagName = function (name, prefix) {
  const componentTagOnly = utils.toPluralForm(_.kebabCase(name));

  if (!prefix) return componentTagOnly;

  return prefix + '-' + componentTagOnly;
};

exports.toComponentFileName = function (name) {
  return utils.toPluralForm(_.kebabCase(name));
};

exports.toListItemComponentName = function (name) {
  return _.upperFirst(_.camelCase(name)) + 'ListItemComponent';
};

exports.toListItemTagName = function (name, prefix) {
  const tagOnly = _.kebabCase(name) + '-list-item';

  if (!prefix) return tagOnly;

  return prefix + '-' + tagOnly;
};

exports.toListItemComponentFileName = function (name) {
  return _.kebabCase(name) + '-list-item';
};

exports.toListItemComponentClass = function (name) {
  return _.camelCase(name) + 'ListItem';
};

exports.toBaseUrl = function (name) {
  return '/api/' + utils.toPluralForm(_.camelCase(name));
};

exports.toFolderName = function (name) {
  return _.kebabCase(name);
};

exports.toModuleFileName = function (name) {
  return utils.toPluralForm(_.kebabCase(name));
};

exports.toServiceFileName = function (name) {
  return _.kebabCase(name);
};
