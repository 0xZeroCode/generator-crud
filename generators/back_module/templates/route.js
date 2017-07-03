const express = require('express');
const router = express.Router();

const <%= managerName %> = require('../application/<%= managerName %>');
const sendPromiseResult = require('../responseSender').sendPromiseResult;

const baseUrl = '<%= baseUrl %>';

router.post('/', function (req, res, next) {
  const promise = <%= managerName %>.create<%= modelName %>(req.body)
      .then(function (id) {
        return {
          success: true,
          id: id
        };
      });

  sendPromiseResult(promise, req, res, next);
});

router.get('/', function (req, res, next) {
  const promise = <%= managerName %>.find(req.query);

  sendPromiseResult(promise, req, res, next);
});

router.get('/search', function (req, res, next) {
  const promise = <%= managerName %>.search(req.query);

  sendPromiseResult(promise, req, res, next);
});

router.get('/pagedSearch', function (req, res, next) {
  const promise = <%= managerName %>.pagedSearch(req.query, req.query.pageNumber, req.query.pageSize);

  sendPromiseResult(promise, req, res, next);
});

router.get('/:id', function (req, res, next) {
  const promise = <%= managerName %>.getById(req.params.id);

  sendPromiseResult(promise, req, res, next);
});

router.put('/:id', function (req, res, next) {
  const promise = <%= managerName %>.update<%= modelName %>(req.params.id, req.body)
      .then(function () {
        return {success: true};
      });

  sendPromiseResult(promise, req, res, next);
});

router.delete('/:id', function (req, res, next) {
  const promise = <%= managerName %>.delete<%= modelName %>(req.params.id)
      .then(function () {
        return {success: true};
      });

  sendPromiseResult(promise, req, res, next);
});


module.exports = {
  baseUrl: baseUrl,
  router: router
};
