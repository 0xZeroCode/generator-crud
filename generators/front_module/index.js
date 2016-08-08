var Base = require('yeoman-generator').Base;
var beautify = require('gulp-beautify');
var gulpIf = require('gulp-if');

var builder = require('./modulePartsBuilder');
var indexHtmlEditor = require('./indexHtmlEditor');
var appJsEditor = require('./appJsEditor');
var utils = require('./utils');


class CrudFrontModuleGenerator extends Base {
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

module.exports = CrudFrontModuleGenerator;
