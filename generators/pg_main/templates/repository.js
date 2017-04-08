const db = require('./db');
const RecordStructure = require('./recordStructure');
const config = require('config');
const _ = require('lodash');

function Repository(tableName, tableStructure, searchableTextFields) {

    this.tableName = tableName;
    this.tableStructure = tableStructure;

    this.searchableTextFields = searchableTextFields || [];

}


Repository.prototype.save = function(record) {

    const structure = new RecordStructure(this.tableStructure, record);

    const query = 'insert into ' + this.tableName + ' ' +
        structure.columnsString +
        ' values ' + structure.valuesString + ' returning id';

    return db.one(query, record)
        .then(function(result) {

            return result.id;

        });

};

Repository.prototype.getById = function(id) {

    const query = 'select * from ' + this.tableName + ' where id=$1';

    return db.one(query, [id]);

};

Repository.prototype.update = function(record) {

    const structure = new RecordStructure(this.tableStructure, record);

    const query = 'update ' + this.tableName + ' SET ' +
        structure.columnsString +
        ' = ' + structure.valuesString + ' where id=${id}';

    return db.any(query, record);

};

Repository.prototype.search = function(queryObject) {

    const query = 'select * from ' + this.tableName + ' ' + this._where(
            queryObject, this._hybridExpression.bind(this)) +
        ' ORDER BY create_date DESC';

    return db.any(query, this._hybridParametersObject(queryObject));

};

Repository.prototype.find = function(queryObject) {

    const query = 'select * from ' + this.tableName + ' ' + this._where(
        queryObject) + ' ORDER BY create_date DESC';

    return db.any(query, queryObject);

};

Repository.prototype.findOne = function(queryObject) {

    const query = 'select * from ' + this.tableName + ' ' + this._where(
        queryObject) + ' ORDER BY create_date DESC LIMIT 1';

    return db.oneOrNone(query, queryObject);

};

Repository.prototype.deleteById = function(id) {

    const query = 'delete from ' + this.tableName + ' where id=$1';

    return db.any(query, [id]);

};

Repository.prototype.deleteByQuery = function(queryObject) {

    const query = 'delete from ' + this.tableName + ' ' + this._where(
        queryObject);

    return db.any(query, queryObject);

};

Repository.prototype.pagedSearch = function(queryObject, pageNumber, pageSize) {

    if (!pageSize) pageSize = config.get('defaultPageSize');

    let offset = 0;

    if (pageNumber) {

        offset = (pageNumber - 1) * pageSize;

    }

    const query = 'select * from ' + this.tableName + ' ' + this._where(
            queryObject, this._hybridExpression.bind(this)) +
        ' ORDER BY create_date DESC LIMIT ' + pageSize + ' OFFSET ' +
        offset;

    return db.any(query, this._hybridParametersObject(queryObject));

};

Repository.prototype.searchCount = function(queryObject) {

    const query = 'select count(*) from ' + this.tableName + ' ' + this._where(
        queryObject, this._hybridExpression.bind(this));

    return db.one(query, this._hybridParametersObject(queryObject))
        .then(function(result) {

            return result.count;

        });

};

Repository.prototype._where = function(queryObject, expression) {

    let chosenExpression = equalityExpression;

    if (expression) chosenExpression = expression;

    const filters = Object.keys(queryObject).filter(function(key) {

        return this.tableStructure.indexOf(_.snakeCase(key));

    }.bind(this)).map(chosenExpression);

    if (filters.length === 0) return '';

    return 'where ' + filters.join(' AND ');

};

Repository.prototype._hybridExpression = function(key) {

    return this.searchableTextFields.includes(key) ? likeExpression(key) :
        equalityExpression(key);

};

Repository.prototype._hybridParametersObject = function(queryObject) {

    const likeObject = likeParametersObject(
        _.pick(queryObject, this.searchableTextFields)
    );

    return Object.assign({}, queryObject, likeObject);

};


function likeParametersObject(queryObject) {

    let result = {};

    Object.keys(queryObject).forEach(function(key) {

        result[key] = '%' + queryObject[key] + '%';

    });

    return result;

}

function likeExpression(key) {

    return _.snakeCase(key) + ' LIKE ' + '${' + key + '}';

}

function equalityExpression(key) {

    return _.snakeCase(key) + '=' + '${' + key + '}';

}

module.exports = Repository;
