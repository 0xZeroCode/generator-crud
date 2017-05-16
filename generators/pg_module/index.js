const Base = require('yeoman-generator').Base;
const beautify = require('gulp-beautify');
const gulpIf = require('gulp-if');
const utils = require('../utils');
const _ = require('lodash');

class PostgresModuleGenerator extends Base {
  constructor(args, options) {

  }

  prompting() { }

  writing() {}

  install() {
    this.installDependencies();
  }
}

module.exports = PostgresModuleGenerator;
