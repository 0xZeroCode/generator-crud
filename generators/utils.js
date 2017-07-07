const path = require('path');
const Promise = require('bluebird');
const fieldsPrompt = require('./fieldsPrompt');

function fileCondition(file) {
  var extension = file.relative.split('.')[1];

  return file.relative !== '.gitignore' && extension !== 'html' && extension !== 'yaml';
}

function projectPrompts(generator) {
  let prompts = [];

  prompts.push({
    type: 'input',
    name: 'name',
    message: 'project name',
    default: path.basename(generator.destinationRoot())
  });

  prompts.push({
    type: 'input',
    name: 'license',
    message: 'license',
    default: 'MIT'
  });

  return prompts;
}

function promptFieldsIfNotPrompted(generator) {
  let optionsPromise = Promise.resolve(generator.options);

  if (!generator.options.fields) {
    optionsPromise = fieldsPrompt.prompt(generator)
      .then(function (fields) {
        return Object.assign({fields: fields}, generator.options);
      }.bind(generator));
  }

  return optionsPromise;
}

function toPluralForm(name) {
  const exceptionSuffixes = ['s', 'x', 'o', 'ch', 'sh'];

  for (let suffix of exceptionSuffixes) {
    if (name.endsWith(suffix)) return name + 'es';
  }

  if (name.endsWith('y')) return name.substring(0, name.length - 1) + 'ies';

  return name + 's';
}

function isSearchableField(field) {
  return field.type === 'string' && field.properties.includes('searchable');
}

module.exports = {
  fileCondition: fileCondition,
  projectPrompts: projectPrompts,
  promptFieldsIfNotPrompted: promptFieldsIfNotPrompted,
  toPluralForm: toPluralForm,
  isSearchableField: isSearchableField
};
