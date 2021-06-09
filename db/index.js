const connection = require('./connection');


class DB {
    constructor (connection){
        this.connection = connection;  
    }

    addDepartment(department){
        return this.connection.query('INSERT INTO department SET ?', department)
    }

    viewAllDepartments(){
        return this.connection.query('SELECT department.id, department.name;')
    }



}
module.exports = new DB(connection);


// everything we did above needs to be done for roles and emplpoyees 