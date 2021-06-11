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
swith(answer.action){
  case 'View all Employees':
    viewEmployees();
    break;
  case 'View all Employees by Department':
    viewByDepartment();
    break;
  case 'View all Employees by Manager':
    viewByManager();
    break;
  case 'Add Employee':
    addEmployee();
    break;
  case 'Remove Employee':
    removeEmployee();
    break;
  case 'Edit Employee Role':
    editRole();
    break;
  case 'Edit Employee Manager':
    editEmpManager();
    break;
  case 'Remove Manager':
    removeManager();
    break;
  case 'View all Roles':
    viewRoles();
    break;
  case 'Add Role':
    addRole();
    break;
  case 'Remove Role':
    removeRole();
    break;
  case 'View all Departments':
    viewDepartments();
    break;
  case 'Add Departments':
    addDepartment();
    break;
  case 'Remove Departments':
    removeDepartment();
    break;
  default:
    console.log ('Error')
}
};