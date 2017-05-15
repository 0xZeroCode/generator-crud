var <%= modelName %> = require('../models/<%= modelLowerName %>');

function create<%= modelName %>(<%= modelLowerName %>Object) {
  var <%= modelLowerName %> = new <%= modelName %>(<%= modelLowerName %>Object);

  <%= modelLowerName %>.createDate = new Date();

  return <%= modelLowerName %>.save()
    .then(function () {
      return <%= modelLowerName %>._id;
    });
}

function get<%= modelName %>s() {
  return <%= modelName %>.find({}).exec();
}

function get<%= modelName %>ById(id) {
  return <%= modelName %>.findOne({_id: id}).exec();
}

function update<%= modelName %>(id, body) {
  body.updateDate = new Date();

  return <%= modelName %>.findOneAndUpdate({_id: id}, body).exec();
}

function delete<%= modelName %>(id) {
  return <%= modelName %>.findByIdAndRemove(id).exec();
}


module.exports = {
  create<%= modelName %>: create<%= modelName %>,
  get<%= modelName %>s: get<%= modelName %>s,
  get<%= modelName %>ById: get<%= modelName %>ById,
  update<%= modelName %>: update<%= modelName %>,
  delete<%= modelName %>: delete<%= modelName %>,
  fullTextSearch: fullTextSearch
};
