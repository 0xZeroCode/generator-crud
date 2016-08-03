var express = require('express');
var router = express.Router();

var <%= managerName %> = require('../application/<%= managerName %>');

var baseUrl = '<%= baseUrl %>';

router.post('/', function (req, res, next) {
  <%= managerName %>.create<%= modelName %>(req.body)
      .then(function (id) {
        res.send({success: true, id: id});
      })
      .catch(function (error) {
        next(error);
      });
});

router.get('/', function (req, res, next) {
  <%= managerName %>.get<%= modelName %>s()
      .then(function (result) {
        res.send(result);
      })
      .catch(function (error) {
        next(error);
      });
});

router.get('/:id', function (req, res, next) {
  <%= managerName %>.get<%= modelName %>ById(req.params.id)
      .then(function (result) {
        res.send(result);
      })
      .catch(function (error) {
        next(error);
      });
});

router.put('/:id', function (req, res, next) {
  <%= managerName %>.update<%= modelName %>(req.params.id, req.body)
      .then(function () {
        res.send({success: true});
      })
      .catch(function (error) {
        next(error);
      });
});

router.delete('/:id', function (req, res, next) {
  <%= managerName %>.delete<%= modelName %>(req.params.id)
      .then(function () {
        res.send({success: true});
      })
      .catch(function (error) {
        next(error);
      });
});

router.get('/fullTextSearch/:searchString', function (req, res, next) {
  <%= managerName %>.fullTextSearch(req.params.searchString)
    .then(function (result) {
      res.send(result);
    })
    .catch(function (error) {
      next(error);
    });
});


module.exports = {
  baseUrl: baseUrl,
  router: router
};
