var Base = require('yeoman-generator').Base;
var beautify = require('gulp-beautify');
var gulpIf = require('gulp-if');

var builder = require('./modulePartsBuilder');
var indexHtmlEditor = require('./indexHtmlEditor');

function fileCondition(file) {
  var extension = file.relative.split('.')[1];

  return file.relative !== '.gitignore' && extension !== 'html';
} //TODO: fix copy/paste

class CrudFrontModuleGenerator extends Base {
  constructor(args, options) {
    super(args, options);

    this.argument('moduleName', {type: String, required: true});
  }

  prompting() {
    var prompts = [];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  }

  writing() {
    this.registerTransformStream(gulpIf(fileCondition, beautify({indentSize: 2})));

    builder.createModuleJsFile(this);

    builder.createModuleHtmlFile(this);

    indexHtmlEditor.addJsScriptDeclarationInHtml(this);

    indexHtmlEditor.addSidenavButton(this);
  }

  install() {
    this.installDependencies();
  }

}

module.exports = CrudFrontModuleGenerator;
