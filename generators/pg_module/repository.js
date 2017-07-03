const names = require('./names');
const utils = require('../utils');
const _ = require('lodash');

exports.generateRepo = function (generator) {
  const tableName = names.toTableName(generator.moduleName);

  const fields = generator.params.fields.map(toSnakeCaseField);

  const searchableFields = fields.filter(utils.isSearchableField);

  const repositoryName = names.toRepositoryName(generator.moduleName);

  generator.fs.copyTpl(
    generator.templatePath('repo.js'),
    generator.destinationPath('src/infrastructure/' + repositoryName + '.js'),
    {
      table: tableName,
      fields: fields,
      searchableFields: searchableFields
    }
  );
};

function toSnakeCaseField(field) {
  return Object.assign({}, field, {name: _.snakeCase(field.name)});
}
