const utils = require('../utils');
const names = require('./names');

exports.buildFiles = function (generator) {

  const name = generator.moduleName;

  const args = {
    serviceName: names.toServiceName(name),
    serviceFileName: names.toServiceFileName(name),
    componentName: names.toComponentName(name),
    componentTagName: names.toComponentTagName(name),
    componentFileName: names.toComponentFileName(name),
    model: names.toModel(name),
    modelInPlural: names.toModelInPlural(name),
    modelUpperName: names.toModelUpperName(name),
    listItemComponentName: names.toListItemComponentName(name),
    listItemComponentTagName: names.toListItemTagName(name),
    listItemComponentFileName: names.toListItemComponentFileName(name),
    listItemComponentClass: names.toListItemComponentClass(name),
    moduleName: names.toModuleName(name),
    baseUrl: names.toBaseUrl(name),
    mainSearchFields: generator.fields.filter(isMainSearchInput),
    searchableFields: generator.fields.filter(isSearchable),
    fields: generator.fields
  };

  const folderName = names.toFolderName(name);

  const appFolder = 'public/src/app';

  const moduleFile = names.toModuleFileName(name) + '.module.ts';
  const serviceFile = names.toServiceFileName(name) + '.service.ts';

  generator.fs.copyTpl(
    generator.templatePath('module.ts'),
    generator.destinationPath(appFolder + '/' + folderName + '/' + moduleFile),
    args
  );

  generator.fs.copyTpl(
    generator.templatePath('component.ts'),
    generator.destinationPath(appFolder + '/' + folderName + '/' + args.componentFileName + '.component.ts'),
    args
  );

  generator.fs.copyTpl(
    generator.templatePath('component.html'),
    generator.destinationPath(appFolder + '/' + folderName + '/' + args.componentFileName + '.component.html'),
    args
  );

  generator.fs.copyTpl(
    generator.templatePath('service.ts'),
    generator.destinationPath(appFolder + '/' + folderName + '/' + serviceFile),
    args
  );

  generator.fs.copyTpl(
    generator.templatePath('list-item.component.ts'),
    generator.destinationPath(appFolder + '/' + folderName + '/' + args.listItemComponentFileName + '.component.ts'),
    args
  );

  generator.fs.copyTpl(
    generator.templatePath('list-item.component.html'),
    generator.destinationPath(appFolder + '/' + folderName + '/' + args.listItemComponentFileName + '.component.html'),
    args
  );
};

function isSearchable(field) {
  return field.properties.includes('searchable');
}

function isMainSearchInput(field) {
  return field.properties.includes('searchAreaInput');
}
