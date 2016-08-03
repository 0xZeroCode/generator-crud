var repository = require('../infrastructure/<%= repositoryName %>');

function create<%= modelName %>(<%= modelLowerName %>) {
  <%= modelLowerName %>.createDate = new Date();

  return repository.insertOrReplace(<%= modelLowerName %>);
}

function get<%= modelName %>s() {
  return repository.fullTextSearch('*');
}

function get<%= modelName %>ById(id) {
  return repository.getById(id);
}

function update<%= modelName %>(id, body) {
  body._id = id;
  body.updateDate = new Date();

  return repository.insertOrReplace(body);
}

function delete<%= modelName %>(id) {
  return repository.delete(id);
}

function fullTextSearch(searchString) {
  return repository.fullTextSearch(searchString);
}


module.exports = {
  create<%= modelName %>: create<%= modelName %>,
  get<%= modelName %>s: get<%= modelName %>s,
  get<%= modelName %>ById: get<%= modelName %>ById,
  update<%= modelName %>: update<%= modelName %>,
  delete<%= modelName %>: delete<%= modelName %>,
  fullTextSearch: fullTextSearch
};
