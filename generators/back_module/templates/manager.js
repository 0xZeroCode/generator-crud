const repository = require('../infrastructure/<%= repositoryName %>');
const utils = require('../utils');
const Promise = require('bluebird');

function create<%= modelName %>(<%= modelLowerName %>Object) {
  <%= modelLowerName %>Object.createDate = new Date();

  return repository.save(<%= modelLowerName %>Object)
    .then(function (id) {
      return {
        id: id,
        createDate: <%= modelLowerName %>Object.createDate
      };
    });
}

function getById(id) {
  return repository.getById(id);
}

function update<%= modelName %>(id, body) {
  body.updateDate = new Date();
  body.id = id;

  return repository.update(body);
}

function search(query) {
  return repository.search(query);
}

function find(query) {
  return repository.find(query);
}

function findOne(query) {
  return repository.findOne(query);
}

function delete<%= modelName %>(id) {
  return repository.deleteById(id);
}

function pagedSearch(query, pageNumber, pageSize) {
  let queryObject = _.omit(
    query, ['pageNumber', 'pageSize']
  );

  return Promise.join(
    repository.pagedSearch(queryObject, pageNumber, pageSize),
    repository.searchCount(queryObject),
    function (result, count) {
      return {
        count: count,
        result: result
      };
    }
  );
}


module.exports = {
  create<%= modelName %>: create<%= modelName %>,
  update<%= modelName %>: update<%= modelName %>,
  delete<%= modelName %>: delete<%= modelName %>,
  getById: getById,
  search: search,
  find: find,
  findOne: findOne,
  pagedSearch: pagedSearch
};
