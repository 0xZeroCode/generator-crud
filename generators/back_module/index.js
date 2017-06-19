var Base = require('yeoman-generator').Base;
var beautify = require('gulp-beautify');
var names = require('./names');
var moduleBuilder = require('./moduleBuilder');
const fieldsPrompt = require('../fieldsPrompt');
const Promise = require('bluebird');
const utils = require('../utils');
const gulpIf = require('gulp-if');

global.Promise = Promise;

class CrudBackModuleGenerator extends Base {
  constructor(args, options) {
    super(args, options);

    this.argument('moduleName', {
      type: String,
      required: true
    });

    this.option('elastic');
    this.option('mongodb');

    this.args = args;
    this.options = options;

    this.extension = '.js';
  }

  prompting() {
    return utils.promptFieldsIfNotPrompted(this)
      .then(function(params) {

        if (this.options.mongodb) {
          this.composeWith('crud:mongo_module', {
            args: this.args,
            options: params
          });
        } else if (this.options.elastic) {
          this.composeWith('crud:elastic_module', {
            args: this.args,
            options: params
          });
        } else {
          this.composeWith('crud:pg_module', {
            args: this.args,
            options: params
          });
        }

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

  writing() {

    moduleBuilder.createRouteFile(this);

    moduleBuilder.writeRoutesUseInApp(this);

    moduleBuilder.createManagerFile(this);

  }

  install() {
    this.installDependencies();
  }
}

module.exports = CrudBackModuleGenerator;
