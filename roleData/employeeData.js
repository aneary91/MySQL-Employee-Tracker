const connection = require('../configuration/connection');

function employeeData() {
    return connection.query('SELECT employeeId, firstName, lastName, title, salary, departmentName, managerId, concat(firstName, ' ' ,lastName) as combinedName FROM employee JOIN roles ON employee.roleId = roles.id JOIN department ON roles.departmentId = department.departmentId');

}

module.exports = employeeData;