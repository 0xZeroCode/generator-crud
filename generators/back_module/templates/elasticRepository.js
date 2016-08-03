var elasticsearch = require('elasticsearch');
var config = require('config');
var Promise = require('bluebird');

var client = elasticsearch.Client({
  host: config.get('elastic.host'),
  log: config.get('elastic.loggingLevel'),
  defer: function () {
    return Promise.defer();
  }
});

var index = '<%= modelLowerName %>';
var type = '<%= modelLowerName %>';

function insertOrReplace(object) {
  var document = {
    index: index,
    type: type,
    body: object
  };

  if (object.id) document.id = object.id;

  return client.index(document)
    .then(function (result) {
      return result._id;
    });
}

function deleteById(id) {
  var document = {
    index: index,
    type: type,
    id: id,
    refresh: true
  };

  return client.delete(document);
}

function getById(id) {
  var document = {
    index: index,
    type: type,
    id: id,
    refresh: true
  };

  return client.get(document);
}

function fullTextSearch(searchString) {
  var document = {
    index: index,
    type: type,
    q: '*' + searchString + '*',
    sort: 'createDate:desc'
  };

  return client.search(document)
    .then(convertElasticResponseTo<%= modelName %>sList);
}

function convertElasticResponseTo<%= modelName %>sList(response) {
  return response.hits.hits.map(function (element) {
    var <%= modelLowerName %> = element._source;

    <%= modelLowerName %>._id = element._id;

    return <%= modelLowerName %>;
  });
}


module.exports = {
  insertOrReplace: insertOrReplace,
  deleteById: deleteById,
  getById: getById,
  fullTextSearch: fullTextSearch
};
