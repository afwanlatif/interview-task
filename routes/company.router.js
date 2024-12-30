const express = require('express');
const app = express.Router();
const controller = require('../controller/company.controller');


// defining routes

app.post('/add', controller.addCompany);
app.delete('/delete/:id', controller.deleteCompany);



module.exports = app;