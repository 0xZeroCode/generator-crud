var Promise = require('bluebird');
var mongoose = require('mongoose');
mongoose.Promise = Promise;

var Schema = mongoose.Schema;

var <%= modelName %>Schema = new Schema({
  // fields
});

// hooks
// methods


module.exports = mongoose.model('<%= modelName %>', <%= modelName %>Schema);
