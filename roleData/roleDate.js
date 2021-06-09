const connection = require("../configuration/connection");

function roleData() {
  return connection.query(
    "SELECT title, salary, id, department_id, department_name FROM roles JOIN department ON roles.department_id = department.deprtment_id"
  );
}


module.exports = roleData