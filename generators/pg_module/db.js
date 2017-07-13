const _ = require('lodash');
const names = require('./names');
const utils = require('../utils');

const sqlTypesMap = {
  'string': 'varchar',
  'number': 'bigint',
  'boolean': 'boolean',
  'datetime': 'timestamptz',
  'date': 'timestamptz',
  'decimal': 'decimal'
};


exports.generateSql = function (generator) {
  const fields = generator.params.fields;

  const searchableSqlFields = fields.filter(utils.isSearchableField).map(toSqlField);

  const sqlFields = fields.map(toSqlField);

  const tableName = names.toTableName(generator.moduleName);

  generator.fs.copyTpl(
    generator.templatePath('model.sql'),
    generator.destinationPath('db/' + tableName + '.sql'),
    {
      table: tableName,
      fields: sqlFields,
      searchableFields: searchableSqlFields
    }
  );
};


function toSqlField(field) {
  return {
    name: _.snakeCase(field.name),
    type: sqlTypesMap[field.type]
  };
}
