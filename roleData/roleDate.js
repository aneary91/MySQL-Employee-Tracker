const connection = require("../configuration/connection");

function roleData() {
  return connection.query(
    "SELECT title, salary, id, departmentId, departmentName FROM roles JOIN department ON roles.departmentId = department.deprtmentId"
  );
}


module.exports = roleData