DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    department VARCHAR 30 NOT NULL
);

CREATE TABLE role(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR 30 NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
    
);

CREATE TABLE  employee(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role(id),
    manager_id INTEGER NOT NULL,
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

CREATE TABLE manager (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    manager_id VARCHAR (30) NOT NULL,
);



