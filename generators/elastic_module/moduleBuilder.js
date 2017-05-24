const names = require('./names');

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

function createElasticRepositoryFile(generator) {
  var repositoryFileName = names.toRepositoryName(generator.moduleName) + generator.extension;

  var repoTemplateVariables = {
    modelName: names.toModelName(generator.moduleName),
    modelLowerName: names.toModelLowerName(generator.moduleName)
  };

  generator.fs.copyTpl(
    generator.templatePath('elasticRepository.js'),
    generator.destinationPath('src/infrastructure/' + repositoryFileName),
    repoTemplateVariables
  );
}

module.exports = {
  createElasticManagerFile: createElasticManagerFile,
  createElasticRepositoryFile: createElasticRepositoryFile
};
