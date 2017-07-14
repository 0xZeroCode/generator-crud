const names = require('./names');

const appModuleFile = 'public/src/app/app.module.ts';

function insertModuleInImports(contents, generator) {
  const importsRegex = /imports:.*?\[((.|\n)+?)\]/im;

  let groups = importsRegex.exec(contents);

  let toReplace = `${groups[1]},
  ${names.toModuleName(generator.moduleName)}`;

  let newImport = groups[0].replace(groups[1], toReplace);

  return contents.replace(groups[0], newImport);
}

function addImportLine(contents, generator) {
  const name = generator.moduleName;
  const componentImport = `import { AppComponent } from './app.component';`;

  const toReplace = `import { ${names.toModuleName(name)} } from './${names.toFolderName(name)}/${names.toModuleFileName(name)}.module';

  ${componentImport}`;

  return contents.replace(componentImport, toReplace);
}

function addRouteUse(contents, generator) {
  const name = generator.moduleName;

  const routesDeclarationPart = `const routes: Route[] = [`;

  const addedRoute = `${routesDeclarationPart}
  {
    path: '${names.toModelInPlural(name)}',
    loadChildren: 'app/${names.toFolderName(name)}/${names.toModuleFileName(name)}.module#${names.toModuleName}'
  },`;

  return contents.replace(routesDeclarationPart, addedRoute);
}

exports.editAppModule = function (generator) {
  let contents = generator.fs.read(generator.destinationPath(appModuleFile));

  contents = addImportLine(contents, generator);

  contents = addRouteUse(contents, generator);

  contents = insertModuleInImports(contents, generator);

  generator.fs.write(generator.destinationPath(appModuleFile), contents);
};

exports.insertModuleInImports = function (generator) {
  const importsRegex = /imports:.*?\[((.|\n)+?)\]/im;

  let contents = generator.fs.read(generator.destinationPath(appModuleFile));

  let groups = importsRegex.exec(contents);

  let toReplace = `${groups[1]},
  ${names.toModuleName(generator.moduleName)}`;

  let newImport = groups[0].replace(groups[1], toReplace);

  contents = contents.replace(groups[0], newImport);

  generator.fs.write(generator.destinationPath(appModuleFile), contents);
};

exports.addImportLine = function (generator) {
  const name = generator.moduleName;
  const componentImport = `import { AppComponent } from './app.component';`;

  const toReplace = `import { ${names.toModuleName(name)} } from './${names.toFolderName(name)}/${names.toModuleFileName(name)}.module';

  ${componentImport}`;

  let contents = generator.fs.read(generator.destinationPath(appModuleFile));

  contents = contents.replace(componentImport, toReplace);

  generator.fs.write(generator.destinationPath(appModuleFile), contents);
};
