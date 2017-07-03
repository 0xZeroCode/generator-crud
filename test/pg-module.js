'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-crud:pg_module', function() {

  const generatorLocation = path.join(__dirname, '../generators/pg_module');

  describe('sql file generation', function() {

    it('should generate CREATE TABLE command with fields', function() {
      return helpers.run(generatorLocation)
        .withArguments(['book'])
        .withOptions({fields: [
          {
            name: 'name',
            type: 'string',
            properties: ['searchable', 'showable']
          },
          {
            name: 'author',
            type: 'string',
            properties: ['searchable', 'showable']
          }
        ]})
        .then(function(dir) {
          const file = dir + '/db/books.sql';
          assert.file(file);

          assert.fileContent(file, /name\ *varchar/gim);
        });
    });

  });

  describe('repo file generation', function () {

    it('should generate repository file with fields', function () {
      return helpers.run(generatorLocation)
        .withArguments(['rectangle'])
        .withOptions({fields: [
          {
            name: 'width',
            type: 'number',
            properties: ['showable']
          },
          {
            name: 'height',
            type: 'number',
            properties: ['showable']
          }
        ]})
        .then(function (dir) {
          const file = dir + '/src/infrastructure/rectanglesRepository.js';

          assert.file(file);

          assert.fileContent(file, 'width');
        })
    })

  });

});
