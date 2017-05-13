var Base = require('yeoman-generator').Base;
var beautify = require('gulp-beautify');
var gulpIf = require('gulp-if');
var utils = require('../utils');
var connect = require('./connect');

class MongoMainGenerator extends Base {
  constructor(args, options) {
    super(args, options);

    this.props = options;

  }

  prompting() {
    var prompts = [];

    return this.prompt(prompts).then(function(props) {
      // To access props later use this.props.someAnswer;

      Object.assign(this.props, props);
    }.bind(this));
  }

  writing() {
    this.registerTransformStream(gulpIf(utils.fileCondition, beautify({
      indentSize: 2
    })));

    this.npmInstall([
      'mongoose'
    ], {
      save: true
    });

    connect.insertConnection(this);
  }

  install() {
    this.installDependencies();
  }
}

module.exports = MongoMainGenerator;
