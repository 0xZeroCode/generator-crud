var names = require('./names');

function createRouteFile(generator) {
  var routeFileName = names.toRouteName(generator.moduleName) + generator.extension;

  var routeTemplateVariables = {
    baseUrl: '/api/' + names.toRouteName(generator.moduleName),
    managerName: names.toManagerName(generator.moduleName),
    modelName: names.toModelName(generator.moduleName)
  };

  generator.fs.copyTpl(
    generator.templatePath('route.js'),
    generator.destinationPath('src/routes/' + routeFileName),
    routeTemplateVariables
  );
}

function createMongoManagerFile(generator) {
  var managerFileName = names.toManagerName(generator.moduleName) + generator.extension;

  var managerTemplateVariables = {
    modelName: names.toModelName(generator.moduleName),
    modelLowerName: names.toModelLowerName(generator.moduleName)
  };

  generator.fs.copyTpl(
    generator.templatePath('manager.js'),
    generator.destinationPath('src/application/' + managerFileName),
    managerTemplateVariables
  );
}

function createMongoModelFile(generator) {
  var modelFileName = names.toModelLowerName(generator.moduleName) + generator.extension;

  var modelTemplateVariables = {
    modelName: names.toModelName(generator.moduleName)
  };

  generator.fs.copyTpl(
    generator.templatePath('model.js'),
    generator.destinationPath('src/models/' + modelFileName),
    modelTemplateVariables
  );
}

module.exports = {
  createRouteFile: createRouteFile,
  createMongoManagerFile: createMongoManagerFile,
  createMongoModelFile: createMongoModelFile
};
