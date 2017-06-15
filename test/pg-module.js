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
        .withPrompts({
          name: 'name',
          type: 'string',
          properties: ['searchable', 'showable']
        })
        .withPrompts({
          name: 'author',
          type: 'string',
          properties: ['searchable', 'showable']
        })
        .withPrompts({
          name: 'done!'
        })
        .then(function(dir) {
          const file = dir + '/db/book.sql';
          assert.file(file);

          assert.fileContent(file, /name\ *varchar/gim);
        });
    });

  });

});
