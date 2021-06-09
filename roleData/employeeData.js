const connection = require('../configuration/connection');

function employeeData() {
    return connection.query('SELECT employee_id, first_name, last_name, title, salary, department_name, manager_id, concat(first_name, ' ' ,last_name) as combinedName FROM employee JOIN roles ON employee.role_id = roles.id JOIN department ON roles.department_id = department.department_id');

}

module.exports = employeeData;