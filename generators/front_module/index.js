var Base = require('yeoman-generator').Base;
var beautify = require('gulp-beautify');
var gulpIf = require('gulp-if');

var utils = require('./utils');


class CrudFrontModuleGenerator extends Base {
  constructor(args, options) {
    super(args, options);

    this.argument('moduleName', {type: String, required: true});

    this.option('ng1');

    if (options.ng1) this.composeWith('crud:ng1_module', {args: args, options: options});
    else this.composeWith('crud:ng2_module', {args: args, options: options});
  }

  prompting() {
    var prompts = [];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  }

  writing() {
  }

  install() {
    this.installDependencies();
  }

}

module.exports = CrudFrontModuleGenerator;
