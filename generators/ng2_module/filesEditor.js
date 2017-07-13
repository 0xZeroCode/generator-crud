const names = require('./names');

const appModuleFile = 'public/src/app/app.module.ts';

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
