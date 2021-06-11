const inquirer = require("inquirer");
const db = require("./db");
const consoleTable = require("console.table");
const { title } = require("process")
const db = require("./app/connection");


async function runPrompts() {
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "userChoice",
      message: "What do you want to do today?",
      choices: [{ name: "viewAllDepartments", value: "VIEW_DEPARTMENTS" },
    {
        name: 'addDepartment',
        value: "ADD_DEPARTMENT"
    }],
    },
    
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
