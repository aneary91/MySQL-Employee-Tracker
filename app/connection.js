const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port:3001,
  password: "",
  database: "employee_db",
});

connection.connect((err) => {
  if (err) throw err;
});
// the util . promisify allows you to use the async await function
connection.query = util.promisify(connection.query);

module.exports = connection;
// make sure to rewuire the connection in the ther files fo that they can talk to each otehrrrrr
