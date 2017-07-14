const names = require('./names');

const appModuleFile = 'public/src/app/app.module.ts';
const appComponentHtmlFile = 'public/src/app/app.component.html';

function insertModuleInImports(contents, generator) {
  const importsRegex = /imports\:.*?\[((.|\n|\r\n)+?)\]/gim;

  let groups = importsRegex.exec(contents);

  let toReplace = `
    ${groups[1].trim()},
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
    loadChildren: 'app/${names.toFolderName(name)}/${names.toModuleFileName(name)}.module#${names.toModuleName(name)}'
  },`;

  return contents.replace(routesDeclarationPart, addedRoute);
}

function addRouterLinkInComponent(contents, generator) {
  const name = generator.moduleName;

  const sidenavPartRegex = /<a href="javascript:void\(0\)" class="closebtn" \(click\)="closeNav\(\)">.+?<\/a>(.|\n|\r\n)*?(<\/div>)/gm;

  const groups = sidenavPartRegex.exec(contents);

  const toReplace = `  <button class="btn btn-gt link" [routerLink]="['/${names.toModelInPlural(name)}']">${names.toModelInPlural(name)}</button>
${groups[2]}`;

  const newSidenavPart = groups[0].replace(groups[2], toReplace);

  return contents.replace(groups[0], newSidenavPart);
}

exports.editAppModule = function (generator) {
  let contents = generator.fs.read(generator.destinationPath(appModuleFile));

  contents = addImportLine(contents, generator);

  contents = addRouteUse(contents, generator);

  contents = insertModuleInImports(contents, generator);

  generator.fs.write(generator.destinationPath(appModuleFile), contents);
};

exports.editAppComponentHtml = function (generator) {
  let contents = generator.fs.read(generator.destinationPath(appComponentHtmlFile));

  contents = addRouterLinkInComponent(contents, generator);

  generator.fs.write(generator.destinationPath(appComponentHtmlFile), contents);
};
