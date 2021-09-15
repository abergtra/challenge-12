//require mysql and inquirer
const mysql = require('mysql2');
const inquirer = require('inquirer');

//connect to mysql
const connection = mysql.createConnection({
  multipleStatements: true,   
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'I<3Kelly!',
  database: 'employee_db'
});

//require terminal styles
const chalk = require('chalk');
const figlet = require('figlet');
//misc requires
const validate = require('./javascript/validate');
const consoleTable = require('console.table');
const util = require('util');

//Make all connection queries promises
connection.query = util.promisify(connection.query);
//Connect to database and present title
connection.connect((err) => {
  if (err) throw err;
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
    const {actions} = answers;
    if (actions === 'View all departments'){
      viewAllDepartments();
    }
    if (actions === 'View all roles'){
      viewAllRoles();
    }
    if (actions === 'View all employees'){
      viewAllEmployees();
    }
    if (actions === 'View employees by manager'){
      viewEmployeesByManager();
    }
    if (actions === 'View employees by department'){
      viewEmployeesByDepartment();
    }
    if (actions === 'View the total utilized budget of a department'){
      viewUtilizedBudget();
    }
    if (actions === 'Add a department'){
      addDepartment();
    }
    if (actions === 'Add a role'){
      addRole();
    }
    if (actions === 'Add an employee'){
      addEmployee();
    }
    if (actions === 'Delete a department'){
      deleteDepartment();
    }
    if (actions === 'Delete a role'){
      deleteRole();
    }
    if (actions === 'Delete an employee'){
      deleteEmployee();
    }
    if (actions === 'Update employee manager'){
      updateManager();
    }
    if (actions === 'Update employee role'){
      updateRole();
    }
    if (actions === 'Exit'){
      connection.end();
    }
  })
}

// Function to 'View all departments' using console.table method
const viewAllDepartments = async () => {
  console.log(chalk.yellow.bold(`====================================================================================`));
  console.log(`                              ` + chalk.green.bold(`All Departments:`));
  console.log(chalk.yellow.bold(`====================================================================================`));   
  try{
    const sql = `SELECT * FROM department`;
    connection.query(sql, (err, res) => {
      if (err) throw err;
      let departmentArray = [];
      res.forEach(department => departmentArray.push(department));
      console.table(departmentArray);
      console.log(chalk.yellow.bold(`====================================================================================`));
      promptUser();
    });
  } catch (err) {
    console.log(err);
    promptUser();
  }
};  

// Function to 'View all roles' using console.log method
const viewAllRoles = () => {
  console.log(chalk.yellow.bold(`====================================================================================`));
  console.log(`                              ` + chalk.green.bold(`All Roles:`));
  console.log(chalk.yellow.bold(`====================================================================================`));   
  try{
    const sql = `SELECT * FROM role`;
    connection.query(sql, (err, res) => {
      if (err) throw err;
      res.forEach(role => {
        console.log(`ID: ${role.id} | Title: ${role.title} | Salary: ${role.salary} | Department ID: ${role.department_id}`);
      })
      promptUser();
    })
  } catch (err) {
    console.log(err);
    promptUser();
  }
};  

// Function to 'View all employees'
const viewAllEmployees = () => {
  console.log(chalk.yellow.bold(`====================================================================================`));
  console.log(`                              ` + chalk.green.bold(`All Employees:`));
  console.log(chalk.yellow.bold(`====================================================================================`));   
  try{
    const sql = `SELECT * FROM employee`;
    connection.query(sql, (err, res) => {
      if (err) throw err;
      let employeeArray = [];
      res.forEach(employee => employeeArray.push(employee));
      console.table(employeeArray);
      console.log(chalk.yellow.bold(`====================================================================================`));
      promptUser();
    });
  } catch (err) {
    console.log(err);
    promptUser();
  }
};  

// Function to 'View employees by manager'
const viewEmployeesByManager = () => {
  const managerSql = `SELECT `
  inquirer.prompt([
    {
      type: 'input',
      name: 'manager',
      message: "Which manager?",
      validate: pickManager => {
        if (pickManager) {
            return true;
        } else {
            console.log('Please enter a first name');
            return false;
        }
      }
    }
  ])
  .then

  console.log(chalk.yellow.bold(`====================================================================================`));
  console.log(`                              ` + chalk.green.bold(`Employees by Manager:`));
  console.log(chalk.yellow.bold(`====================================================================================`));
  const sql = `SELECT`;
  connection.query(sql, (err, response) => {
    if (err) throw err;
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
  connection.query(sql, (err, response) => {
    if (err) throw err;
    console.log(chalk.yellow.bold(`====================================================================================`));
    promptUser();
  });
};  

// Function to 'View the total utilized budget of a department' print whole res method
const viewUtilizedBudget = () => {
  const sql = `SELECT department_id AS id, department.department_name AS department, SUM(salary) AS budget
              FROM  role  
              INNER JOIN department ON role.department_id = department.id 
              GROUP BY  role.department_id
              ORDER BY department.id ASC`;
  connection.query(sql, (err, res) => {
    if (err) throw err;
    console.log(chalk.yellow.bold(`====================================================================================`));
    console.log(`                              ` + chalk.green.bold(`Departments Total Utilized Budget:`));
    console.log(chalk.yellow.bold(`====================================================================================`));
    console.table(res);
    console.log(chalk.yellow.bold(`====================================================================================`));
    promptUser();
  });
}

// Function to 'Add a department'
const addDepartment = () => {
  inquirer.prompt({
    name: 'department',
    type: 'input',
    message: "What is the new department's name?"
  })
  .then(function(answer) {
    const sql = `INSERT INTO department (name) VALUES ( ? )`;
    connection.query(sql, andwer.department, function(err, res) {
      if (err) throw err;
      console.log(chalk.yellow.bold(`====================================================================================`));
      console.log(`                              ` + chalk.green.bold(`New Department Added:`));
      console.log(chalk.yellow.bold(`====================================================================================`));
      console.log(`${(answer.department).toUpperCase()}.`);
      console.log(chalk.yellow.bold(`====================================================================================`));
      viewAllDepartments();
    })
  })
}

// Function to 'Add a role'
const addRole = async () => {
  try {
    let departments = await connection.query("SELECT * FROM department");
    let answer = await inquirer.prompt([
      {
        name: 'title',
        type: 'input',
        message: "What is the new role's title?"
      },
      {
        name: 'salary',
        type: 'input',
        message: "What is the new role's salary?"
      },
      {
        name: 'departmentID',
        type: 'list',
        choices: departments.map((departmentID) => {
          return {
            name: departmentID.department_name,
            value: departmentID.id
          }
        }),
        message: "Pick a department to oversee this role:",
      }
    ]);

    let pickedDept;
    for (i = 0; i < departments.length; i++){
      if (departments[i].department_id === answer.choice) {
        pickedDept = departments[i];
      };
    }

    let result = await connection.query("INSERT INTO role SET ?", {
      title: answer.title,
      salary: answer.salary,
      department_id: answer.departmentID
    })

    console.log(chalk.yellow.bold(`====================================================================================`));
    console.log(`                              ` + chalk.green.bold(`New Role Added:`));
    console.log(chalk.yellow.bold(`====================================================================================`));
    console.log(`${(answer.title)}`);
    console.log(chalk.yellow.bold(`====================================================================================`));
    viewAllRoles();
  }  catch (err) {
    console.log(err);
    viewAllRoles();
  };
}

// Function to 'Add an employee'
const addEmployee = async () => {
  try {
    let managers = await connection.query("SELECT * FROM employee");
    let roles = await connection.query("SELECT * FROM role");
    let answer = await inquirer.prompt([
      {
        name: 'firstName',
        type: 'input',
        message: "What is the new employee's first name?"
      },
      {
        name: 'lastName',
        type: 'input',
        message: "What is the new employee's last name?"
      },
      {
        name: 'empRoleID',
        type: 'list',
        choices: roles.map((empRoleID) => {
          return {
            name: empRoleID.title,
            value: empRoleID.id
          }
        }),
        message: "Pick this new employee's role ID:",
      },
      {
        name: 'empManagerID',
        type: 'list',
        choices: managers.map((empManagerID) => {
          return {
            name: empManagerID.first_name + ' ' + empManagerID.last_name,
            value: empManagerID.id
          }
        }),
        message: "Pick a manager to oversee this new employee:",
      }
    ]);

    let result = await connection.query("INSERT INTO employee SET ?", {
      first_name: answer.firstName,
      last_name: answer.lastName,
      role_id: (answer.empRoleID),
      manager_id: (answer.empManagerID)
    });

    console.log(chalk.yellow.bold(`====================================================================================`));
    console.log(`                              ` + chalk.green.bold(`New Employee Added:`));
    console.log(chalk.yellow.bold(`====================================================================================`));
    console.log(`Welcome ${(answer.firstName)} ${(answer.lastName)}!`);
    console.log(chalk.yellow.bold(`====================================================================================`));
    viewAllEmployees();

  }  catch (err) {
    console.log(err);
    viewAllEmployees();
  };
}

// Function to 'Delete a department'

// Function to 'Delete a role'

// Function to 'Delete an employee'

// Function to 'Update employee manager'

// Function to 'Update employee role'
const updateRole = async () => {
  try {
    let employees = await connection.query("SELECT * FROM employee");
    let pickEmployee = await inquirer.prompt([
      {
        name: 'employee',
        type: 'list',
        choices: employees.map((thisEmployee) => {
          return {
            name: thisEmployee.first_name + ' ' + thisEmployee.last_name,
            value: thisEmployee.id
          }
        }),
        message: "Pick an existing employee to update their role:"
      }
    ]);

    let roles = await connection.query("SELECT * FROM role");
    let pickRole = await inquirer.prompt([
      {
        name: 'role',
        type: 'list',
        choices: roles.map((thisRole) => {
          return {
            name: thisRole.title,
            value: thisRole.id
          }
        }),
        message: "Pick a new role for this employee:"
      }
    ]);

    let result = await connection.query("UPDATE employee SET ? WHERE ?", [
      {role_id: pickRole.role},
      {id: pickEmployee.employee}
    ]);

    console.log(chalk.yellow.bold(`====================================================================================`));
    console.log(`                              ` + chalk.green.bold(`Employee Role Updated:`));
    console.log(chalk.yellow.bold(`====================================================================================`));
    console.log(`${(pickEmployee.name)} is now a ${(pickRole.title)}`);
    console.log(chalk.yellow.bold(`====================================================================================`));
    viewAllEmployees();

  }  catch (err) {
    console.log(err);
    viewAllEmployees();
  };
}






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
//   }