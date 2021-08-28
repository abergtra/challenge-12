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
  .then((answers) => {
    const {choices} = answers;
    if (choices === 'View all departments'){
      viewAllDepartments();
    }
    if (choices === 'View all roles'){
      viewAllRoles();
    }
    if (choices === 'View all employees'){
      viewAllEmployees();
    }
    if (choices === 'View employees by manager'){
      viewEmployeesByManager();
    }
    if (choices === 'View employees by department'){
      viewEmployeesByDepartment();
    }
    if (choices === 'View the total utilized budget of a department'){
      viewUtilizedBudget();
    }
    if (choices === 'Add a department'){
      addDepartment();
    }
    if (choices === 'Add a role'){
      addRole();
    }
    if (choices === 'Add an employee'){
      addEmployee();
    }
    if (choices === 'Delete a department'){
      deleteDepartment();
    }
    if (choices === 'Delete a role'){
      deleteRole();
    }
    if (choices === 'Delete an employee'){
      deleteEmployee();
    }
    if (choices === 'Update employee manager'){
      updateManager();
    }
    if (choices === 'Update employee role'){
      updateRole();
    }
    if (choices === 'Exit'){
      Exit();
    }
  })
}

// Function to 'View all departments'
const viewAllDepartments = () => {
  let sql = `SELECT department.id AS id, department.department_name AS department 
            FROM department
            ORDER BY department.id ASC`;
  connection.promise().query(sql, (error, response) => {
    if (error) throw error;
    console.log(chalk.yellow.bold(`====================================================================================`));
    console.log(`                              ` + chalk.green.bold(`All Departments:`));
    console.log(chalk.yellow.bold(`====================================================================================`));
    console.table(response);
    console.log(chalk.yellow.bold(`====================================================================================`));
    promptUser();
  });
};  

// Function to 'View all roles'
const viewAllRoles = () => {
  let sql = `SELECT role.id, role.title, department.department_name AS department
            FROM role
            INNER JOIN department ON role.department_id = department.id
            ORDER BY role.id ASC`;
  connection.promise().query(sql, (error, response) => {
    if (error) throw error;
    console.log(chalk.yellow.bold(`====================================================================================`));
    console.log(`                              ` + chalk.green.bold(`All Roles:`));
    console.log(chalk.yellow.bold(`====================================================================================`));
    console.table(response);
    console.log(chalk.yellow.bold(`====================================================================================`));
    promptUser();
  });
};  

// Function to 'View all employees'
const viewAllEmployees = () => {
  let sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS 'department', role.salary
            FROM employee, role, department 
            WHERE department.id = role.department_id AND role.id = employee.role_id
            ORDER BY employee.id ASC`;
  connection.promise().query(sql, (error, response) => {
    if (error) throw error;
    console.log(chalk.yellow.bold(`====================================================================================`));
    console.log(`                              ` + chalk.green.bold(`All Employees:`));
    console.log(chalk.yellow.bold(`====================================================================================`));
    console.table(response);
    console.log(chalk.yellow.bold(`====================================================================================`));
    promptUser();
  });
};  

// Function to 'View employees by manager'
const viewEmployeesByManager = () => {
  console.log(chalk.yellow.bold(`====================================================================================`));
  console.log(`                              ` + chalk.green.bold(`Employees by Manager:`));
  console.log(chalk.yellow.bold(`====================================================================================`));
  const sql = `SELECT`;
  connection.promise().query(sql, (error, response) => {
    if (error) throw error;
    console.log(chalk.yellow.bold(`====================================================================================`));
    promptUser();
  });
};  

// Function to 'View employees by department'
const viewEmployeesByDepartment = () => {
  console.log(chalk.yellow.bold(`====================================================================================`));
  console.log(`                              ` + chalk.green.bold(`Employees by Department:`));
  console.log(chalk.yellow.bold(`====================================================================================`));
  const sql = `SELECT`;
  connection.promise().query(sql, (error, response) => {
    if (error) throw error;
    console.log(chalk.yellow.bold(`====================================================================================`));
    promptUser();
  });
};  

// Function to 'View the total utilized budget of a department'
const viewUtilizedBudget = () => {
  console.log(chalk.yellow.bold(`====================================================================================`));
  console.log(`                              ` + chalk.green.bold(`Department Total Utilized Budget:`));
  console.log(chalk.yellow.bold(`====================================================================================`));
  const sql = `SELECT`;
  connection.promise().query(sql, (error, response) => {
    if (error) throw error;
    console.log(chalk.yellow.bold(`====================================================================================`));
    promptUser();
  });
};  

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