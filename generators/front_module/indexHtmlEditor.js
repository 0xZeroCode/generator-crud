var names = require('./names');

var htmlFile = 'src/public/index.html';


function addJsScriptDeclarationInHtml(generator) {
  var appScriptRegexp = /<script[ ]+src[ ]*=[ ]*"app.js"[ ]*>[ ]*<\/script>/mi;

  var contents = generator.fs.read(generator.destinationPath(htmlFile));

  var appScriptString = '<script src="app.js"></script>';

  var moduleJsFileName = names.toModuleFileName(generator.moduleName) + '.js';

  var moduleScriptString = `<script src="${generator.moduleName}/${moduleJsFileName}"></script>`;

  var stringToReplace =
    `${appScriptString}
${moduleScriptString}`;

  contents = contents.replace(appScriptRegexp, stringToReplace);

  generator.fs.write(generator.destinationPath(htmlFile), contents);
}

function addSidenavButton(generator) {
  var sidenavRegexp = /(<md-sidenav(.|[\r\n])*?>(.|[\r\n])*?<md-content(.|[\r\n])*?>(.|[\r\n])*?<div(.|[\r\n])*?>)((.|[\r\n])*?)(<\/div>(.|[\r\n])*?<\/md-content>(.|[\r\n])*?<\/md-sidenav>)/mi;

  var buttonString =
    `
          <md-button md-menu-origin ng-href="#/${generator.moduleName}" class="md-raised general-sidebar-menu-item">
            ${generator.moduleName}
          </md-button>
        `;

  var contents = generator.fs.read(generator.destinationPath(htmlFile));

  contents = contents.replace(sidenavRegexp, "$1$7" + buttonString + "$9");

  generator.fs.write(generator.destinationPath(htmlFile), contents);
}


module.exports = {
  addJsScriptDeclarationInHtml: addJsScriptDeclarationInHtml,
  addSidenavButton: addSidenavButton
};
