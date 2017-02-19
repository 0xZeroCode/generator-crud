var Base = require('yeoman-generator').Base;
var beautify = require('gulp-beautify');
var gulpIf = require('gulp-if');
var utils = require('../utils');

class AngularOneMainGenerator extends Base {
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

    this.bowerInstall([
      'angular',
      'angular-material',
      'angular-route',
      'angular-aria',
      'angular-animate',
      'angular-messages',
      'material-design-icons',
      'angular-cookies',
      'angular-jwt'
    ], {
      'save': true
    });

    this.fs.copy(
      this.templatePath('bowerrc'),
      this.destinationPath('.bowerrc')
    );

    if (!this.fs.exists(this.destinationPath('bower.json'))) {
      this.fs.copyTpl(
        this.templatePath('bower.json'),
        this.destinationPath('bower.json'), {
          name: this.projectName,
          license: this.license
        }
      );
    }

    this.fs.copyTpl(
      this.templatePath('public'),
      this.destinationPath('public'), {
        appName: _.camelCase(this.projectName),
        appUpperName: _.upperFirst(_.camelCase(this.projectName))
      }
    );
  }

  install() {
    this.installDependencies();
  }
}

module.exports = AngularOneMainGenerator;
