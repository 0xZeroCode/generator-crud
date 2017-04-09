var Base = require('yeoman-generator').Base;
var beautify = require('gulp-beautify');
var gulpIf = require('gulp-if');
var utils = require('../utils');
const dbConfig = require('./dbConfig');

class PgMainGenerator extends Base {
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
      'pg-promise',
      'pg'
    ], {
      save: true
    });

    let files = ['db.js', 'recordStructure.js', 'repository.js'];

    files.forEach(function(file) {
      this.fs.copy(
        this.templatePath(file),
        this.destinationPath('src/infrastructure/' + file)
      );
    }.bind(this));

    dbConfig.writeDbParamsToConfig(this);

  }

  install() {
    this.installDependencies();
  }
}

module.exports = PgMainGenerator;
