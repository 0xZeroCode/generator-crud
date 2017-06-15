'use strict';
const chai = require('chai');
const should = chai.should();
const Promise = require('bluebird');

global.Promise = Promise;

describe('utils', function () {

  const utils = require('../generators/utils');

  describe('#promptFieldsIfNotPrompted()', function () {

    it('should prompt fields when no options passed', function () {

      const fields = [
        {
          name: 'name',
          type: 'string',
          properties: ['searchable', 'showable']
        },
        {
          name: 'age',
          type: 'number',
          properties: ['showable']
        },
        {
          name: 'done!'
        }
      ];

      let index = 0;

      let generator = {
        options: {},
        prompt: function () {
          return Promise.resolve(fields[index++]);
        }
      };

      return utils.promptFieldsIfNotPrompted(generator)
        .then(function (params) {

          should.exist(params);

          params.should.have.property('fields');

          params.fields.should.have.length(2);

        });

    });

  });

});
