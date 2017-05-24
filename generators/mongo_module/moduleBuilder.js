const names = require('./names');

function createMongoModelFile(generator) {
  let modelFileName = names.toModelLowerName(generator.moduleName) + generator.extension;

  let modelTemplateVariables = {
    modelName: names.toModelName(generator.moduleName)
  };

  generator.fs.copyTpl(
    generator.templatePath('model.js'),
    generator.destinationPath('src/models/' + modelFileName),
    modelTemplateVariables
  );
}

module.exports = {
  createMongoModelFile: createMongoModelFile
};
