const mysql = require("mysql");



class Database {
  constructor(config) {
    this.connection = mysql.createConnection(process.env.JAWSDB_URL ? process.env.JAWSDB_URL : config);

  }

  query(sql, args = []) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args,(err, rows) => {
        if (err) return reject(err);
        resolve(rows)
      })
    })
  }
  close() {
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if (err) return reject(err);
        resolve();
      })
    })
  }
}
  // connect to the database (db)
function dbConnect(dbName, dbPassword){
  
    const db = new Database ({
      host: "localhost",
      user: "root",
      port:3001,
      // you need to enter your password, then create a database name below and create the table//
      password: "",
      database: "employee_db"
  })
  return db 
}

modules.exports = dbConnect








