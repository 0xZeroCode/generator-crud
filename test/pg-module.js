'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-crud:pg_module', function () {
  it('should generate sql file', function () {
    return helpers.run(path.join(__dirname, '../pg_module'))
      .withArguments(['book'])
      .withPrompts({name: 'name', type: 'string', properties: ['searchable', 'showable']})
      .withPrompts({name: 'author', type: 'string', properties: ['searchable', 'showable']})
      .then(function (dir) {
        assert.file('db/book.sql');

        //TODO: assert content
      })
  });
});
