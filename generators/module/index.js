var Base = require('yeoman-generator').Base;
var beautify = require('gulp-beautify');
var gulpIf = require('gulp-if');
const utils = require('../utils');
const fieldsPrompt = require('../fieldsPrompt');


class CrudModuleGenerator extends Base {
  constructor(args, options) {
    super(args, options);

    this.argument('moduleName', {type: String, required: true});

    this.args = args;
    this.options = options;

  }

  prompting() {
    return fieldsPrompt.prompt(this)
      .then(function (fields) {
        this.fields = fields;
        console.log(this.fields);

        let params = Object.assign({fields: this.fields}, this.options);

        this.composeWith('crud:back_module', {args: this.args, options: params});
        this.composeWith('crud:front_module', {args: this.args, options: params});

      }.bind(this))
  }

  writing() {
  }

  install() {
    this.installDependencies();
  }

}

module.exports = CrudModuleGenerator;
