var Base = require('yeoman-generator').Base;
var beautify = require('gulp-beautify');
var names = require('./names');
var moduleBuilder = require('./moduleBuilder');


class CrudBackModuleGenerator extends Base {
  constructor(args, options) {
    super(args, options);

    this.argument('moduleName', {type: String, required: true});

    this.option('elastic');

    this.extension = '.js';
  }

  prompting() {
    var prompts = [];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  }

  writing() {
    this.registerTransformStream(beautify({indentSize: 2}));

    moduleBuilder.createRouteFile(this);

    moduleBuilder.createMongoManagerFile(this);
  }

  install() {
    this.installDependencies();
  }
}

module.exports = CrudBackModuleGenerator;
