var Base = require('yeoman-generator').Base;
var beautify = require('gulp-beautify');
var gulpIf = require('gulp-if');

function fileCondition(file) {
  var extension = file.relative.split('.')[1];

  return file.relative !== '.gitignore' && extension !== 'html';
} //TODO: fix copy/paste


class CrudModuleGenerator extends Base {
  constructor(args, options) {
    super(args, options);

    this.argument('moduleName', {type: String, required: true});

    this.composeWith('crud:back_module', {args: args, options: options});
    this.composeWith('crud:front_module', {args: args, options: options});
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
  }

  install() {
    this.installDependencies();
  }

}

module.exports = CrudModuleGenerator;
