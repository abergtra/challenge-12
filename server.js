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
    console.log("promptUser()");
  });


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