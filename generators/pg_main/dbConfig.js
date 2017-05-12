const names = require('./names');

exports.writeDbParamsToConfig = function (generator) {
  const dbName = generator.props.name;
  const configPath = generator.destinationPath('config/default.yaml');

  let contents = generator.fs.read(configPath);

  contents += getParamsString(dbName);

  generator.fs.write(configPath, contents);
};

function getParamsString(dbName) {
  let dbParams =
    `
db:
  host: 'localhost'
  port: '5432'
  database: '${dbName}'
  user: 'postgres'
  password: '123456789'`;

  return dbParams;
}
