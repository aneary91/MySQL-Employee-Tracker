const mysql = require("mysql");



class Database {
  constructor(config) {
    this.connection = mysql.createConnection(process.env.JAWSDB_URL ? process.env.JAWSDB_URL : config);

  }

  
}










const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port:3001,
  password: "",
  database: "employee_db",
});

