const path = require('path');

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

module.exports = {
  fileCondition: fileCondition,
  projectPrompts: projectPrompts
};
