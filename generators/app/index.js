'use strict';
var Base = require('yeoman-generator').Base;
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var beautify = require('gulp-beautify');
var gulpIf = require('gulp-if');
var _ = require('lodash');
const utils = require('../utils');

function fileCondition(file) {
  var extension = file.relative.split('.')[1];

  return file.relative !== '.gitignore' && extension !== 'html';
}

class CrudMainGenerator extends Base {
  prompting() {
    this.log(yosay(
      'Welcome to the remarkable ' + chalk.red('generator-crud') + ' generator!'
    ));

    var prompts = [];

    if (!this.fs.exists(this.destinationPath('package.json'))) {
      prompts = utils.projectPrompts(this);
    }

    return this.prompt(prompts).then(function(props) {
      // To access props later use this.props.someAnswer;
      this.props = props;

      const params = Object.assign({}, props, this.options);

      this.composeWith('crud:back_main', {
        options: params
      });
      this.composeWith('crud:front_main', {
        options: params
      });
    }.bind(this));
  }

  writing() {
    this.registerTransformStream(gulpIf(fileCondition, beautify({
      indentSize: 2
    })));
  }

  install() {
    this.installDependencies();
  }
}

module.exports = CrudMainGenerator;
