const Base = require('yeoman-generator').Base;
const beautify = require('gulp-beautify');
const gulpIf = require('gulp-if');
const utils = require('../utils');
const _ = require('lodash');

const moduleBuilder = require('./moduleBuilder');

class MongoModuleGenerator extends Base {
  constructor(args, options) {
    super(args, options);

    this.argument('moduleName', {
      type: String,
      required: true
    });

    this.args = args;
    this.options = options;

    this.extension = '.js';
  }

  prompting() {
    return utils.promptFieldsIfNotPrompted(this)
      .then(function(params) {
        this.params = params;

        var prompts = [];

        return this.prompt(prompts);
      })
      .then(function(props) {
        // To access props later use this.props.someAnswer;
        this.props = props;
      }.bind(this));
  }

  writing() {
    this.registerTransformStream(beautify({
      indentSize: 2
    }));

    moduleBuilder.createMongoModelFile(this);
  }

  install() {
    this.installDependencies();
  }
}

module.exports = MongoModuleGenerator;
