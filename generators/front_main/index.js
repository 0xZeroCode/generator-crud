'use strict';
var Base = require('yeoman-generator').Base;
var path = require('path');
var beautify = require('gulp-beautify');
var _ = require('lodash');

class FrontMainGenerator extends Base {
  constructor(args, options) {
    super(args, options);

    this.projectName = options.name;
    this.license = options.license;
  }

  prompting() {
    var prompts = [];

    if (!this.projectName && !this.fs.exists(this.destinationPath('bower.json'))) {
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
    }

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      if (props.name) this.projectName = props.name;

      if (props.license) this.license = props.license;

      this.props = props;
    }.bind(this));
  }

  writing() {
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
    ], {'save': true});

    this.fs.copy(
      this.templatePath('bowerrc'),
      this.destinationPath('.bowerrc')
    );

    if (!this.fs.exists(this.destinationPath('bower.json'))) {
      this.fs.copyTpl(
        this.templatePath('bower.json'),
        this.destinationPath('bower.json'),
        {name: this.projectName, license: this.license}
      );
    }

    this.fs.copyTpl(
      this.templatePath('public'),
      this.destinationPath('src/public'),
      {appName: _.camelCase(this.projectName), appUpperName: _.upperFirst(_.camelCase(this.projectName))}
    );
  }

  install() {
    this.installDependencies();
  }
}

module.exports = FrontMainGenerator;
