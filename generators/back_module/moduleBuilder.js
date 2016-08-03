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

function writeRoutesUseInApp(generator) {
  var routeName = names.toRouteName(generator.moduleName);
  var appDeclareString = 'var app = express();';

  var routeDeclareBeforeApp =
    `var ${routeName} = require('./routes/${routeName}');
    
${appDeclareString}`;

  var contents = generator.fs.read(generator.destinationPath('src/app.js'));

  contents = contents.replace(appDeclareString, routeDeclareBeforeApp);

  var appHtmlGet = 'app.get\(\'\*';

  var appUseRouter =
    `app.use(${routeName}.baseUrl, ${routeName}.router);

${appHtmlGet}`;

  contents = contents.replace(appHtmlGet, appUseRouter);

  generator.fs.write(generator.destinationPath('src/app.js'), contents);
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

function createElasticManagerFile(generator) {
  var managerFileName = names.toManagerName(generator.moduleName) + generator.extension;

  var managerTemplateVariables = {
    modelName: names.toModelName(generator.moduleName),
    modelLowerName: names.toModelLowerName(generator.moduleName),
    repositoryName: names.toRepositoryName(generator.moduleName)
  };

  generator.fs.copyTpl(
    generator.templatePath('elasticManager.js'),
    generator.destinationPath('src/application/' + managerFileName),
    managerTemplateVariables
  );
}

module.exports = {
  createRouteFile: createRouteFile,
  createMongoManagerFile: createMongoManagerFile,
  createMongoModelFile: createMongoModelFile,
  writeRoutesUseInApp: writeRoutesUseInApp,
  createElasticManagerFile: createElasticManagerFile
};
