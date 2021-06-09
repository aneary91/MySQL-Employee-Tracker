const connection = require('../configuration/connection');

function departmentData() {
    return connection.query('SELECT * FROM department;')

}

module.exports = departmentData;