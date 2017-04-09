var Base = require('yeoman-generator').Base;
var beautify = require('gulp-beautify');
var gulpIf = require('gulp-if');
var utils = require('../utils');

class MongoMainGenerator extends Base {
  prompting() {
    var prompts = [];

    return this.prompt(prompts).then(function(props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
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
  }

  install() {
    this.installDependencies();
  }
}

module.exports = MongoMainGenerator;