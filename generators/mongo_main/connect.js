exports.insertConnection = function(generator) {
  const appPath = generator.destinationPath('src/app.js');

  const appHtmlGet = 'app.get\(\'\*';

  let connection = `mongoose.connect(config.get('mongoDatabase'));


${appHtmlGet}`;

  let contents = generator.fs.read(appPath);

  contents = contents.replace(appHtmlGet, connection);

  generator.fs.write(appPath, contents);
};
