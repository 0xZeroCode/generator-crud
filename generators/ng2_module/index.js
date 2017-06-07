const Base = require('yeoman-generator').Base;
const beautify = require('gulp-beautify');
const gulpIf = require('gulp-if');
const utils = require('../utils');
const _ = require('lodash');

class AngularTwoModuleGenerator extends Base {
  constructor(args, options) {
    this.args = args;
    this.options = options;
  }

  prompting() {
    return utils.promptFieldsIfNotPrompted(this)
      .then(function (params) {
        this.params = params;
      });
  }

  writing() {}

  install() {
    this.installDependencies();
  }
}

module.exports = AngularTwoModuleGenerator;
