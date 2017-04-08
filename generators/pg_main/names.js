const _ = require('lodash');

exports.toDbName = function(name) {
  return _.snakeCase(name);
};
