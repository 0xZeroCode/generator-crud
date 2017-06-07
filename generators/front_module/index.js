var Base = require('yeoman-generator').Base;
var beautify = require('gulp-beautify');
var gulpIf = require('gulp-if');

const utils = require('../utils');

const fieldsPrompt = require('../fieldsPrompt');
const Promise = require('bluebird');

global.Promise = Promise;


class CrudFrontModuleGenerator extends Base {
  constructor(args, options) {
    super(args, options);

    this.argument('moduleName', {
      type: String,
      required: true
    });

    this.option('ng1');

    this.args = args;
    this.options = options;

  }

  prompting() {

    return utils.promptFieldsIfNotPrompted(this)
      .then(function (params) {
        if (this.options.ng1) this.composeWith('crud:ng1_module', {
          args: this.args,
          options: params
        });
        else this.composeWith('crud:ng2_module', {
          args: this.args,
          options: params
        });
      }.bind(this))
      .then(function() {
        var prompts = [];

        return this.prompt(prompts)
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

module.exports = CrudFrontModuleGenerator;
