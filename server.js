//import express
const express = require('express');

//PORT designation and app expression
const PORT = process.env.PORT || 3001;
const app = express();

// Add express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());







//Function that will start the Express.js server on port 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });