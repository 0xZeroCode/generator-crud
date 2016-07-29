var Base = require('yeoman-generator').Base;
var beautify = require('gulp-beautify');


class CrudBackModuleGenerator extends Base {
  prompting() {
    var prompts = [];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  }

  writing() {
    this.registerTransformStream(beautify({indentSize: 2}));


  }

  install() {
    this.installDependencies();
  }
}

module.exports = CrudBackModuleGenerator;
