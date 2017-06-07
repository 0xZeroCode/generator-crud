const Base = require('yeoman-generator').Base;
const beautify = require('gulp-beautify');
const gulpIf = require('gulp-if');
const utils = require('../utils');
const _ = require('lodash');

class PostgresModuleGenerator extends Base {
  constructor(args, options) {
    super(args, options);

    this.args = args;
    this.options = options;
  }

  prompting() {
    return utils.promptFieldsIfNotPrompted(this)
      .then(function(params) {
        this.params = params;

        var prompts = [];

        return this.prompt(prompts);
      }.bind(this))
      .then(function(props) {
        // To access props later use this.props.someAnswer;
        this.props = props;
      }.bind(this));
  }

  writing() {}

  install() {
    this.installDependencies();
  }
}

module.exports = PostgresModuleGenerator;
