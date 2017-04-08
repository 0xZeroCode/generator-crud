const config = require('config');
const bluebird = require('bluebird');

const pgp = require('pg-promise')({
    promiseLib: bluebird,
    receive: function(data, result, e) {

        camelize(data);

    }
});

function camelize(data) {

    const template = data[0];

    for (let prop in template) {

        if (template.hasOwnProperty(prop)) {

            const camel = pgp.utils.camelize(prop);

            if (camel in template) continue;

            for (let i = 0; i < data.length; i++) {

                let record = data[i];

                record[camel] = record[prop];

                delete record[prop];

            }

        }

    }

}


const db = pgp(config.get('db'));

module.exports = db;
