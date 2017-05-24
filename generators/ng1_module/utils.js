var htmlFile = 'src/public/index.html';

function fileCondition(file) {
  var extension = file.relative.split('.')[1];

  return file.relative !== '.gitignore' && extension !== 'html';
} //TODO: fix copy/paste

function getAppName(generator) {
  var appRegexp = /ng-app[ ]*=[ ]*"(.+?)"/mi; //regular expression

  var contents = generator.fs.read(generator.destinationPath(htmlFile));

  var result = appRegexp.exec(contents);

  return result[1]; //app name. string in (.+?)
}

module.exports = {
  fileCondition: fileCondition,
  getAppName: getAppName
};
