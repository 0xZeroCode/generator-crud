var names = require('./names');

function createRouteFile(generator) {
  var routeFileName = names.toRouteName(generator.moduleName) + generator.extension;

  var routeVariables = {
    baseUrl: '/api/' + names.toRouteName(generator.moduleName),
    managerName: names.toManagerName(generator.moduleName),
    modelName: names.toModelName(generator.moduleName)
  };

  generator.fs.copyTpl(
    generator.templatePath('route.js'),
    generator.destinationPath('src/routes/' + routeFileName),
    routeVariables
  );
}

function createMongoManagerFile(generator) {
  var managerFileName = names.toManagerName(generator.moduleName) + generator.extension;

  var managerVariables = {
    modelName: names.toModelName(generator.moduleName),
    modelLowerName: names.toModelLowerName(generator.moduleName)
  };

  generator.fs.copyTpl(
    generator.templatePath('manager.js'),
    generator.destinationPath('src/application/' + managerFileName),
    managerVariables
  );
}

module.exports = {
  createRouteFile: createRouteFile,
  createMongoManagerFile: createMongoManagerFile
};
