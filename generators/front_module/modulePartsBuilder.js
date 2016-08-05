var names = require('./names');

var htmlFile = 'src/public/index.html';

function getAppName(generator) {
  var appRegexp = /ng-app[ ]*=[ ]*"(.+?)"/mi; //regular expression


  var contents = generator.fs.read(generator.destinationPath(htmlFile));

  var result = appRegexp.exec(contents);

  return result[1]; //app name. string in (.+?)
}

function createModuleJsFile(generator) {
  var fileName = names.toModuleFileName(generator.moduleName) + '.js';

  var applicationName = getAppName(generator);

  var moduleTemplateVariables = {
    appName: applicationName,
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
