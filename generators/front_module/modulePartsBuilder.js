var names = require('./names');

function createModuleJsFile(generator) {
  var fileName = names.toModuleFileName(generator.moduleName) + '.js';

  var moduleTemplateVariables = {
    appName: generator.appName,
    moduleName: generator.moduleName,
    controllerName: names.toControllerName(generator.moduleName),
    factoryName: names.toFactoryName(generator.moduleName),
    moduleUpperName: names.toModuleUpperName(generator.moduleName),
    moduleUrlName: names.toModuleUrlName(generator.moduleName)
  };

  generator.fs.copyTpl(
    generator.templatePath('module.js'),
    generator.destinationPath('src/public/' + generator.moduleName + '/' + fileName),
    moduleTemplateVariables
  );
}

function createModuleHtmlFile(generator) {
  var fileName = generator.moduleName + '.html';

  generator.fs.copyTpl(
    generator.templatePath('module.html'),
    generator.destinationPath('src/public/' + generator.moduleName + '/' + fileName),
    {moduleName: generator.moduleName}
  );
}


module.exports = {
  createModuleJsFile: createModuleJsFile,
  createModuleHtmlFile: createModuleHtmlFile
};
