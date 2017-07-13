const Base = require('yeoman-generator').Base;
const beautify = require('gulp-beautify');
const gulpIf = require('gulp-if');
const utils = require('../utils');
const _ = require('lodash');
const filesBuilder = require('./filesBuilder');

class AngularTwoModuleGenerator extends Base {
  constructor(args, options) {
    super(args, options);

    this.argument('moduleName', {
      type: String,
      required: true
    });

    this.args = args;
    this.options = options;

  }

  prompting() {
    return utils.promptFieldsIfNotPrompted(this)
      .then(function (params) {
        this.params = params;

        this.fields = params.fields;
      }.bind(this));
  }

  writing() {
    filesBuilder.buildFiles(this);
  }

  install() {
    this.installDependencies();
  }
}

module.exports = AngularTwoModuleGenerator;
