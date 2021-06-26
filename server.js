const inquirer = require("inquirer")
const consoleTable = require("console.table")
const { title } = require("process")
const db = require("./app/connection")('employees', 'aneary91')
const mysql = require('mysql')

async function beginPrompt() {
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
  //created a function for the question prompt
switch(answer.action){
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

// view the employees prompt, and then joins databases
async function viewEmployees(){
  const employeeData = await db.query('SELECT e.id, e.first_name, e.last_name, r.title, d.department, r.salary, m.manager FROM employee AS e LEFT JOIN role AS r ON e.role_id = r.id LEFT JOIN departmentAS d on r.department_id = d.id LEFT JOIN manager AS m ON e.manager_id = m.id')
  if (employeeData.length == 0) {
    console.log('Error: No employees found')
    beginPrompt()
  } else {
    console.table(employeeData)
    beginPrompt()
  }
}

//view the departments prompt. then grab from the database
async function viewByDepartment(){
  const departmentArr = await []
  const data = await db.query('SELECT () FROM department')
  data.map(({department, id}) => {
    departmentArr.push({name: department, value: id})
  })
  if (departmentArr.length == 0 ) {
    console.log ('Error, no department found')
    beginPrompt()  
  } else {
    const answer = await inquirer.prompt([
      {
        message: 'Please select which department to view',
        type: 'list',
        choices: departmentArr,
        name: department
      }
    ])
    const departmentData = await db.query(`SELECT e.first_name, e.last_name FROM employee AS e LEFT JOIN role AS r ON e.role_id = r.id LEFT JOIN department AS d ON r.department_id = d.id WHERE d.id = ${answer.department}`)
    if (departmentData.length == 0) {
      console.log( 'There are no employees in this Department')
      beginPrompt()
    } else {
      beginPrompt()
    }
  }
}

// function to view employees by manager, and then grab from the dbC
async function viewByManager(){
  const managerArr = []
  const data = await db.query('SELECT * FROM manager')
  data.map(({manager, id}) => {
    managerArr.push({name: manager, value: id})
  })
  if (managerArry.length == 0 ){
    console.log('No managers found')
    beginPrompt()
  } else {
    const answer = await inquirer.prompt([
      {
        message: 'Select a manager list to view',
        type: 'list',
        choices: 'managerArr',
        name: 'manager'
      }
    ])
    const managerData = await db.query('SELECT e.first_name,e.last_name FROM employee AS e WHERE e.manager_id = ${answer.manager}')
    if (managerData.length == 0) {
      console.log('There are no employees assigned to this manager')
      beginPrompt()
    } else {
      beginPrompt()
    }
  }
}

// add employee function 
async function addEmployee(){
  const roleArr = await db.query('SELECT * FROM role')
  const roles = roleArr.map(({title, id}) =>
  ({name: title, value: id})
  )
  const managerArr = await db.query('SELECT * FROM employee')

  const managers = managerArr.map(({fist_name, id}) =>
  ({name: fist_name, value: id})
  )
  const questions = await inquirer.prompt([
    {
      message: 'What is the Employees fist name?',
      type: 'input',
      name: 'fist_name'
    },
    {
      message: 'What is the Employees last name?',
      type: 'input',
      name: 'last_name'
    },
    {
      message: 'What is the Employees roles?', 
      type: 'list',
      name: 'role_id',
      choice: roles
    },
    {
      message: 'Who is the employees manager?',
      type:'list',
      name: 'manager_id',
      choice: managers
    }
  ])
  await db.query('INSERT INTO employees SET ?' [questions])
  beginPrompt();
}

// remove employee function 
async function removeEmployee() {
  const employeeData = await db.query('SELECT * FROM employee')
  const employees = employeeData.map(({first_name, last_name}) =>
  ({name: first_name, last_name, value: id})
  )
    const answer = await inqiurer.prompt([
      {
        message: 'Please choose an Employee to remove',
        type: 'list',
        name: 'id',
        choices: employees
      }
    ])
    await db.query('DELETE FROM employee WHERE id = ${answer.id')
    viewEmployees()
}

// update an employee role function 
async function editRole() {
  const employeeData = await db.query('SELECT * FROM employee')
  const employees = employeeData.map(({first_name, last_name, id}) =>
  ({name:'${first_name} ${last_name}', value:id})
  )
  const roleData = await db.query('SELECT * FROM role')
  const roles = roleData.map(({title, id}) =>
  ({name: title, value: id})
  )
    const answer = await inquirer.prompt([
      {
        message: 'Choose an employee to update',
        type: 'list',
        name: 'employee',
        choices: employees
      },
      {
        message: 'Choose a role to assign',
        type: 'list',
        name: 'updateRole',
        choice: roles
      }
    ])
    await db.query('UPDATE employees SET role_id = ${answer.updatedRole} WHERE id = ${anwser.employee}')
    beginPrompt()
}

//function to update manager of the employee
async function editEmpManager() {
  const employeeData = await db.query('SELECT * FROM employee')
    const employees = employeeData.map(({first_name, last_name, id}) => 
      ({name: '${first_name} ${last_name}', value: id})
      )
  const managerData = await db.query('SELECT * FROM manager')
    const managers = managerData.map(({manager, id}) => 
      ({name: manager, value: id})
    )
  const answer = await inquirer.prompt([
    {
      message: 'Choose the employee you want to update',
      type: 'list',
      name: 'employee',
      choices: employees
    },
    {
      message: 'Choose a manager to assign this employee to',
      type: 'list',
      name: 'newManager',
      choices: managers
    }
  ])
  await db.query('UPDATE employee SET manager_id = ${answer.newManager} WHERE id = ${answer.employee}')
  beginPrompt()
}

//function to remove manager 
async function removeManager(){
  const managerData = await db.query('SELECT * FROM manager')
    const managers = managerData.map(({manager, id}) => 
      ({name: manager, value: id})
    )
    
  const answer = await inquirer.prompt([
    {
      message: 'Choose a mamager to remove',
      type: 'list',
      name: 'id',
      choices: managers
    }
  ])
  await db.query('DELETE FROM manager WHERE id = ${answer.id}')
  beginPrompt()
};

// function to view the roles of the employees 
async function viewRoles() {
  const roleData = await db.query('SELECT * FROM roles')
  if (roleData.length == 0){
    console.log('Error: this list is empty')
    beginPrompt()
  } else {
    console.table(roleData)
    beginPrompt()
  }
}

//function to add a role 
async function addRole() {
  const departmentData = await db.query('SELECT * FROM department')
    const departments = departmentData.map(({department, id}) =>
      ({name: department, value: id})
    )
  const answer = await inquirer.prompt([
    {
      message: 'What role do you wish to add?',
      type: 'input',
      name: 'title'
  },
  {
      message: 'Please input the salary for this role',
      type: 'input',
      name: 'salary'
  },
  {
      message: 'Choose a Department to assign this role to',
      type: 'list',
      name: 'department_id',
      choices: departments
    }
  ])
  await db.query('INSERT INTO role SET ?', [answer])
  beginPrompt()
}

//funtion to remove a role 
async function removeRole() {
  const roleData = await db.query('SELECT * FROM role')
    const roles = roleData.map(({title, id}) => 
      ({name: title, value: id})
    )
  const answer = await inquirer.prompt([
    {
      message: 'Choose a role to remove',
      type: 'list',
      name: 'id',
      choices: roles
    }
  ])
  await db.query('DELETE FROM role WHERE id = ${answer.id}')
  beginPrompt()
}

//function to view all departments
async function addDepartment() {
  const answer = await inquirer.prompt([
    {
      message: 'Enter the name of the Department youd like to add',
      type: 'input',
      name: 'department'
    }
  ])
  await db.query('INSERT INTO department SET ?', [answer])
  beginPrompt()
}

//function to remove a department
async function removeDepartment() {
  departmentData = await db.query('SELECT * FROM department')
    const departments = departmentData.map(({department, id}) => 
      ({name: department, value: id})
    )
    const answer = await inquirer.prompt([
      {
        message: 'Slect a department to remove',
        type: 'list',
        name: 'id',
        choices: departments  
      }
    ])
    await db.query('DELETE FROM department WHERE id = `${answer.id}`')
    await db.query('DELETE FROM role WHERE department_id = `${answer.id}`')
}

beginPrompt();
