const _ = require('lodash');

function RecordStructure(tableFields, record) {

    const fields = Object.keys(record).filter(function(key) {

        return tableFields.indexOf(_.snakeCase(key)) > -1;

    });

    const columns = fields.map(_.snakeCase.bind(_));

    this.columnsString = '(' + columns.join(', ') + ')';

    const valueParameters = fields.map(function(field) {

        return '${' + field + '}';

    });

    this.valuesString = '(' + valueParameters.join(', ') + ')';

}

module.exports = RecordStructure;
