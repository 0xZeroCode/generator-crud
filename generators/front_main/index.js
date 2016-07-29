'use strict';
var Base = require('yeoman-generator').Base;
// var chalk = require('chalk');
// var yosay = require('yosay');
var path = require('path');
var beautify = require('gulp-beautify');

class FrontMainGenerator extends Base {
  prompting() {


    var prompts = [];

    /*if (!this.fs.exists(this.destinationPath('package.json'))) {
     prompts.push({
     type: 'input',
     name: 'name',
     message: 'project name',
     default: path.basename(this.destinationRoot())
     });

     prompts.push({
     type: 'input',
     name: 'license',
     message: 'license',
     default: 'MIT'
     });
     }*/

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  }

  writing() {
    this.registerTransformStream(beautify({indentSize: 2}));

    this.bowerInstall([
      'angular',
      'angular-material',
      'angular-route',
      'material-design-icons',
      'angular-cookies',
      'angular-jwt'
    ], {'save': true});

    /*this.fs.copyTpl(
     this.templatePath('project'),
     this.destinationRoot(),
     {name: this.props.name, license: this.props.license}
     );*/

    this.fs.copy(
      this.templatePath('project/.bowerrc'),
      this.destinationPath('.bowerrc')
    );
  }

  install() {
    this.installDependencies();
  }
}

module.exports = FrontMainGenerator;
