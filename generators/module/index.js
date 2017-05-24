var Base = require('yeoman-generator').Base;
var beautify = require('gulp-beautify');
var gulpIf = require('gulp-if');
const utils = require('../utils');
const fieldsPrompt = require('../fieldsPrompt');


class CrudModuleGenerator extends Base {
  constructor(args, options) {
    super(args, options);

    this.argument('moduleName', {type: String, required: true});

    this.composeWith('crud:back_module', {args: args, options: options});
    this.composeWith('crud:front_module', {args: args, options: options});
  }

  prompting() {
    fieldsPrompt.prompt(this)
      .then(function (fields) {
        this.fields = fields;
        console.log(this.fields);
      }.bind(this))
  }

  writing() {
  }

  install() {
    this.installDependencies();
  }

}

module.exports = CrudModuleGenerator;
