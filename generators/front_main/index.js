'use strict';
var Base = require('yeoman-generator').Base;
var path = require('path');
var beautify = require('gulp-beautify');
var _ = require('lodash');

class FrontMainGenerator extends Base {
  constructor(args, options) {
    super(args, options);

    this.projectName = options.name;
    this.license = options.license;
  }

  prompting() {
    var prompts = [];

    if (!this.projectName && !this.fs.exists(this.destinationPath('bower.json'))) {
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
      if (props.name) this.projectName = props.name;

      if (props.license) this.license = props.license;

      this.props = props;
    }.bind(this));
  }

  writing() {
  }

  install() {
    this.installDependencies();
  }
}

module.exports = FrontMainGenerator;
