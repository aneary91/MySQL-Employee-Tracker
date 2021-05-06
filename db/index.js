const connection = require('./connection');


class DB {
    constructor (connection){
        this.connection = connection;  
    }

    addDepartment(department){
        return this.connection.query('INSERT INTO department SET ?', department)
    }
}
module.exports = new DB(connection);


// everything we did above needs to be done for roles and emplpoyees 