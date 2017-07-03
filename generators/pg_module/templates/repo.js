const Repository = require('./repository');

const tableName = '<%= table %>';

const tableFields = [
  'id',
  <% for (let i = 0; i < fields.length - 1; i++) { %>'<%= fields[i].name %>',
  <% } %>'<%= fields[fields.length - 1].name %>',
  'create_date',
  'update_date'
];

const searchableFields = [
  <% for (let i = 0; i < searchableFields.length - 1; i++) { %>'<%= searchableFields[i].name %>',
  <% } %>'<%= searchableFields[searchableFields.length - 1].name %>'
];

const repo = new Repository(tableName, tableFields, searchableFields);


module.exports = repo;
