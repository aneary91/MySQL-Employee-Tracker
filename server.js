const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");
const { title } = require("process")
const db = require("./app/connection");


async function runPrompts() {
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What do you want to do today?",
      choices: [
        'View all Employees',
        'View all Employees by Department',
        'View all Employees by Manager',
        'Add Employee',
        'Remove Employee',
        'Edit Employee Role',
        'Edit Employee Manager',
        'Remove Manager',
        'View all Roles',
        'Add Role',
        'Remove Role',
        'View all Departments',
        'Add Department',
        'Remove Department',
      ], 
    }
  ])

  .then(answers => {
    switch (answers.userChoice) {
        case "VIEW_DEPARTMENTS": 
        viewDpts()
      }
  })

};


const viewDpts = () => {
    db.viewAllDepartments()
    .then
}
