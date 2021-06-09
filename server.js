const inquirer = require("inquirer");
const db = require("./db");
require("console.table");

runPrompts();

const runPrompts = () => {
  inquirer.prompt([
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
