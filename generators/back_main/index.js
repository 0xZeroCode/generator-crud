var Base = require('yeoman-generator').Base;
var beautify = require('gulp-beautify');
var gulpIf = require('gulp-if');
var utils = require('../utils');
const _ = require('lodash');

class BackMainGenerator extends Base {
  constructor(args, options) {
    super(args, options);

    this.projectName = options.name;
    this.license = options.license;

    this.option('mongodb');
    this.option('elastic');

    this.props = options;

  }

  prompting() {
    var prompts = [];

    if (!this.projectName && !this.fs.exists(this.destinationPath('package.json'))) {
      prompts = prompts.concat(utils.projectPrompts(this));
    }

    return this.prompt(prompts).then(function(props) {
      // To access props later use this.props.someAnswer;
      if (props.name) this.projectName = props.name;

      if (props.license) this.license = props.license;

      Object.assign(this.props, props);

      const params = Object.assign({}, this.props, this.options);

      if (this.options.mongodb) {
        this.composeWith('crud:mongo_main', {options: params});
      } else if (this.options.elastic) {
        this.composeWith('crud:elastic_main', {options: params});
      } else {
        this.composeWith('crud:pg_main', {options: params});
      }

    }.bind(this));
  }

  writing() {
    this.registerTransformStream(gulpIf(utils.fileCondition, beautify({
      indentSize: 2
    })));

    this.npmInstall([
      'bluebird',
      'config',
      'js-yaml',
      'express',
      'body-parser',
      'lodash'
    ], {
      'save': true
    });

    this.fs.copyTpl(
      this.templatePath('project/config'),
      this.destinationPath('config'), {
        dbName: _.camelCase(this.props.name) + 'Db'
      }
    );

    this.fs.copy(
      this.templatePath('project/src'),
      this.destinationPath('src')
    );

    if (!this.fs.exists(this.destinationPath('package.json'))) {
      this.fs.copyTpl(
        this.templatePath('project/package.json'),
        this.destinationPath('package.json'), {
          name: this.props.name,
          license: this.props.license
        }
      );
    }

    this.fs.copy(
      this.templatePath('project/gitignore'),
      this.destinationPath('.gitignore')
    );
  }

  install() {
    this.installDependencies();
  }
}

module.exports = BackMainGenerator;
