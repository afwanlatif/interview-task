const express = require('express');
const app = express.Router();
const controller = require('../controller/user.controller');

// defining routes

app.post('/add', controller.createUser);
app.get('/getCompany/:id', controller.getUsersByCompany);


module.exports = app;