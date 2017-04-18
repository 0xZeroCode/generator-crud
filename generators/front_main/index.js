'use strict';
var Base = require('yeoman-generator').Base;
var path = require('path');
var beautify = require('gulp-beautify');
var _ = require('lodash');
const utils = require('../utils');

class FrontMainGenerator extends Base {
  constructor(args, options) {
    super(args, options);

    this.projectName = options.name;
    this.license = options.license;

    this.option('ng1');

    this.props = options;
  }

  prompting() {
    var prompts = [];

    if (!this.projectName && !this.fs.exists(this.destinationPath('bower.json'))) {
      prompts = prompts.concat(utils.projectPrompts(this));
    }

    return this.prompt(prompts).then(function(props) {
      // To access props later use this.props.someAnswer;
      if (props.name) this.projectName = props.name;

      if (props.license) this.license = props.license;

      Object.assign(this.props, props);

      const params = Object.assign({}, this.props, this.options);

      if (this.options.ng1) {
        this.composeWith('crud:ng1_main', {
          options: params
        });
      } else {
        this.composeWith('crud:ng2_main', {
          options: params
        });
      }

    }.bind(this));
  }

  writing() {}

  install() {
    this.installDependencies();
  }
}

module.exports = FrontMainGenerator;
