const Repository = require('./repository');

const tableName = '<%= table %>';

const tableFields = [
  'id',
  <% for (let i = 0; i < fields.length; i++) { %>'<%= fields[i].name %>',
  <% } %>'create_date',
  'update_date'
];

const searchableFields = [
  <% for (let i = 0; i < searchableFields.length - 1; i++) { %>'<%= searchableFields[i].name %>',
  <% } %><% if (searchableFields.length > 0) {%>'<%= searchableFields[searchableFields.length - 1].name %>'<% } %>
];

const repo = new Repository(tableName, tableFields, searchableFields);


module.exports = repo;
