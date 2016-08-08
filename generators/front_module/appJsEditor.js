var names = require('./names');

function addModuleInDependencies(generator) {
  var moduleApplicationName = generator.appName + '.' + generator.moduleName;

  var stringToPaste =
    `,
    '${moduleApplicationName}'
  `;

  var angularModuleRegexp = /(angular\.module\(.+,(.|[\r\n])+?)(]\))/;

  var appFilePath = generator.destinationPath('src/public/app.js');

  var contents = generator.fs.read(appFilePath);

  contents = contents.replace(angularModuleRegexp, "$1" + stringToPaste + "$3");

  generator.fs.write(appFilePath, contents);
}

module.exports = {
  addModuleInDependencies: addModuleInDependencies
};
