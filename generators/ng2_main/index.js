var Base = require('yeoman-generator').Base;
var beautify = require('gulp-beautify');
var gulpIf = require('gulp-if');
var utils = require('../utils');

class AngularTwoMainGenerator extends Base {
  constructor(args, options) {
    super(args, options);

    this.props = options;
  }

  prompting() {
    var prompts = [];

    prompts.push({
      type: 'input',
      name: 'prefix',
      message: 'component name prefix',
      default: 'app'
    });

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
      '@angular/common',
      '@angular/compiler',
      '@angular/core',
      '@angular/forms',
      '@angular/http',
      '@angular/platform-browser',
      '@angular/platform-browser-dynamic',
      '@angular/router',
      'bootstrap',
      'core-js',
      'font-awesome',
      'jquery',
      'js-cookie',
      'ng2-datetime',
      'ngx-bootstrap',
      'rxjs',
      'zone.js'
    ], {
      'save': true
    });

    this.npmInstall([
      '@angular/cli',
      '@angular/compiler-cli',
      '@types/jquery',
      '@types/js-cookie',
      '@types/node',
      'codelyzer',
      'ts-node',
      'tslint',
      'typescript'
    ], {
      'save-dev': true
    });

    var parameters = {
      name: this.props.name,
      license: this.props.license,
      prefix: this.props.prefix
    };

    this.fs.copyTpl(
      this.templatePath('public'),
      this.destinationPath('public'),
      parameters
    );
  }

  install() {
    this.installDependencies();
  }
}

module.exports = AngularTwoMainGenerator;
