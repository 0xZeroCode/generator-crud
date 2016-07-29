'use strict';
var Base = require('yeoman-generator').Base;
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var beautify = require('gulp-beautify');

class CrudMainGenerator extends Base {
  prompting() {
    this.log(yosay(
      'Welcome to the remarkable ' + chalk.red('generator-crud') + ' generator!'
    ));

    var prompts = [];

    if (!this.fs.exists(this.destinationPath('package.json'))) {
      prompts.push({
        type: 'input',
        name: 'name',
        message: 'project name',
        default: path.basename(this.destinationRoot())
      });

      prompts.push({
        type: 'input',
        name: 'license',
        message: 'license',
        default: 'MIT'
      });
    }

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  }

  writing() {
    this.registerTransformStream(beautify({indentSize: 2}));

    this.npmInstall([
      'mongoose',
      'elasticsearch',
      'bluebird',
      'config',
      'js-yaml',
      'express',
      'body-parser'
    ], {'save': true});

    this.fs.copyTpl(
      this.templatePath('project'),
      this.destinationRoot(),
      {name: this.props.name, license: this.props.license}
    );

    this.fs.copy(
      this.templatePath('project/.gitignore'),
      this.destinationPath('.gitignore')
    );
  }

  install() {
    this.installDependencies();
  }
}

module.exports = CrudMainGenerator;
