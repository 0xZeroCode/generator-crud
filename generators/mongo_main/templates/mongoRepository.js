const config = require('config');
const _ = require('lodash');

class MongoRepository {
  constructor(modelClass, searchableTextFields) {
    this.modelClass = modelClass;
    this.searchableFields = searchableTextFields;
  }

  save(record) {
    if (record instanceof this.modelClass) {
      return record.save()
        .then(function() {
          return record._id;
        });
    }

    let model = new this.modelClass(record);

    return model.save()
      .then(function() {
        return model._id;
      });
  }

  getById(id) {
    return this.modelClass.findOne({
      _id: id
    }).exec();
  }

  update(record) {
    if (record instanceof this.modelClass) {
      return record.save();
    }

    let model = new this.modelClass(record);

    if (record.id) {
      model._id = record.id;
    }

    return model.save();
  }

  search(queryObject) {
    return this.modelClass.find(
      this._hybridParametersObject(queryObject)
    ).exec();
  }

  

  _hybridParametersObject(queryObject) {
    const likeObject = this._likeParametersObject(
      _.pick(queryObject, this.searchableFields)
    );

    return Object.assign({}, queryObject, likeObject);
  }

  _likeParametersObject(queryObject) {

    let result = {};

    Object.keys(queryObject)
      .forEach(function(key) {

        result[key] = new RegExp('.*' + queryObject[key] + '.*', 'gimu');

      });

    return result;

  }
}
