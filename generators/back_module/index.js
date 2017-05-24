var Base = require('yeoman-generator').Base;
var beautify = require('gulp-beautify');
var names = require('./names');
var moduleBuilder = require('./moduleBuilder');


class CrudBackModuleGenerator extends Base {
  constructor(args, options) {
    super(args, options);

    this.argument('moduleName', {
      type: String,
      required: true
    });

    this.option('elastic');
    this.option('mongodb');

    if (options.mongodb) {
      this.composeWith('crud:mongo_module', {args: args, options: options});
    } else if (options.elastic) {
      this.composeWith('crud:elastic_module', {args: args, options: options});
    } else {
      this.composeWith('crud:pg_module', {args: args, options: options});
    }

    this.extension = '.js';
  }

  prompting() {
    var prompts = [];

    return this.prompt(prompts).then(function(props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  }

  writing() {
    this.registerTransformStream(beautify({
      indentSize: 2
    }));

    moduleBuilder.createRouteFile(this);

    moduleBuilder.writeRoutesUseInApp(this);

    moduleBuilder.createManagerFile(this);

  }

  install() {
    this.installDependencies();
  }
}

module.exports = CrudBackModuleGenerator;
