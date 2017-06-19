const _ = require('lodash');

const sqlTypesMap = {
  'string': 'varchar',
  'number': 'bigint',
  'boolean': 'boolean',
  'datetime': 'timestamptz',
  'decimal': 'decimal'
};


exports.generateSql = function (generator) {
  const fields = generator.params.fields;

  const searchableSqlFields = fields.filter(isSearchableField).map(toSqlField);

  const sqlFields = fields.map(toSqlField);

  const tableName = generator.moduleName;

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

function isSearchableField(field) {
  return field.type === 'string' && field.properties.includes('searchable');
}

function toSqlField(field) {
  return {
    name: _.snakeCase(field.name),
    type: sqlTypesMap[field.type]
  };
}
