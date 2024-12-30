const express = require('express');
const app = express.Router();
const controller = require('../controller/user.company.controller');

// defining routes

app.post('/add', controller.alloCateUsers);
app.get('/getUsers', controller.listOfUsersWithCompanies);

module.exports = app;