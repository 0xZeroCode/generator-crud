const Base = require('yeoman-generator').Base;
const beautify = require('gulp-beautify');
const gulpIf = require('gulp-if');
const utils = require('../utils');
const _ = require('lodash');

const builder = require('./modulePartsBuilder');
const indexHtmlEditor = require('./indexHtmlEditor');
const appJsEditor = require('./appJsEditor');

class AngularOneModuleGenerator {
  constructor(args, options) {
    super(args, options);

    this.argument('moduleName', {type: String, required: true});

    this.appName = utils.getAppName(this);
  }

  prompting() {
    var prompts = [];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  }

  writing() {
    this.registerTransformStream(gulpIf(utils.fileCondition, beautify({indentSize: 2})));

    builder.createModuleJsFile(this);

    builder.createModuleHtmlFile(this);

    indexHtmlEditor.addJsScriptDeclarationInHtml(this);

    indexHtmlEditor.addSidenavButton(this);

    appJsEditor.addModuleInDependencies(this);
  }

  install() {
    this.installDependencies();
  }
}

module.exports = AngularOneModuleGenerator;
