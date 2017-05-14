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

    let recordToSave = _.omit(record, ['id']);

    recordToSave._id = record.id;

    return this.modelClass.findOneAndUpdate({
      _id: record.id
    }, recordToSave).exec();

  }

  search(queryObject) {
    return this.modelClass.find(
        this._hybridParametersObject(queryObject)
      )
      .sort({
        createDate: -1
      })
      .exec();
  }

  find(queryObject) {
    return this.modelClass.find(queryObject)
      .sort({
        createDate: -1
      })
      .exec();
  }

  findOne(queryObject) {
    return this.modelClass.findOne(queryObject)
      .sort({
        createDate: -1
      })
      .exec();
  }

  deleteById(id) {
    return this.modelClass.findByIdAndRemove(id).exec();
  }

  deleteByQuery(queryObject) {
    return this.modelClass.find(queryObject)
      .remove()
      .exec();
  }

  searchCount(queryObject) {
    
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
