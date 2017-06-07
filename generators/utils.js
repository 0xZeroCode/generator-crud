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
  let optionsPromise = Promise.reslove(generator.options);

  if (!generator.options.fields) {
    optionsPromise = fieldsPrompt.prompt(generator)
      .then(function (fields) {
        return Object.assign({fields: fields}, generator.options);
      }.bind(generator));
  }

  return optionsPromise;
}

module.exports = {
  fileCondition: fileCondition,
  projectPrompts: projectPrompts,
  promptFieldsIfNotPrompted: promptFieldsIfNotPrompted
};
