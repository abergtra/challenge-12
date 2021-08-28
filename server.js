//connect to mysql and require inquirer
const connection = require('./config/connection');
const inquirer = require('inquirer');
//require terminal styles
const chalk = require('chalk');
const figlet = require('figlet');
//require validation
const validate = require('./javascript/validate');

//Connect to database and present title
connection.connect((error) => {
  if (error) throw error;
  console.log(chalk.yellow.bold(`====================================================================================`));
  console.log(``);
  console.log(chalk.greenBright.bold(figlet.textSync('Employee Tracker')));
  console.log(``);
  console.log(`                                                          ` + chalk.greenBright.bold('Created By: Asher Bergtraun'));
  console.log(``);
  console.log(chalk.yellow.bold(`====================================================================================`));
  //call function to prompt user actions
  promptUser();
});

//Funtion to prompt user with possible actions
const promptUser = () => {
  inquirer.prompt([
    {
      name: 'actions',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'View employees by manager',
      'View employees by department',
      'View the total utilized budget of a department',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Delete a department',
      'Delete a role',
      'Delete an employee',
      'Update employee manager',
      'Update employee role',
      'Exit'
      ]
    }
  ])
}

// Function to 'View all departments'

// Function to 'View all roles'

// Function to 'View all employees'

// Function to 'View employees by manager'

// Function to 'View employees by department'

// Function to 'View the total utilized budget of a department'

// Function to 'Add a department'

// Function to 'Add a role'

// Function to 'Add an employee'

// Function to 'Delete a department'

// Function to 'Delete a role'

// Function to 'Delete an employee'

// Function to 'Update employee manager'

// Function to 'Update employee role'

// Function to 'Exit'





// IF WE WANTED TO ADD PORTS
//import express
// const express = require('express');

// //PORT designation and app expression
// const PORT = process.env.PORT || 3001;
// const app = express();

// // Add express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// // Default response for any other request (Not Found)
// app.use((req, res) => {
//     res.status(404).end();
// });

// //Function that will start the Express.js server on port 3001
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });