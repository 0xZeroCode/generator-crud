const Promise = require('bluebird');
const promiseMethods = require('./promiseMethods');

global.Promise = Promise;

stopSignal = 'done!'
types = ['number', 'string', 'boolean', 'datetime', 'decimal'];

fieldPrompts = [{
    type: 'input',
    name: 'name',
    message: `field name. ${stopSignal} means prompt close`,
    default: stopSignal
  },
  {
    type: 'list',
    name: 'type',
    message: 'field type',
    choices: types,
    when: function(props) {
      return props.name !== stopSignal;
    }
  },
  {
    type: 'checkbox',
    name: 'properties',
    message: 'field properties. searchable means: field can be searched by LIKE expression',
    choices: [{
        name: 'showable',
        checked: true
      },
      {
        name: 'searchable',
        checked: false
      }
    ],
    when: function(props) {
      return props.name !== stopSignal;
    }
  }
];

exports.prompt = function(generator) {
  list = [];

  return generator.prompt(fieldPrompts)
    .then(function(props) {
      let field = props;

      return promiseMethods.whileLoop(
        function() {
          return field.name !== stopSignal;
        },
        function() {
          list.push(field);

          return generator.prompt(fieldPrompts)
            .then(function(props) {
              field = props;
            });
        }
      );
    })
    .then(function () {
      return list;
    });
};
