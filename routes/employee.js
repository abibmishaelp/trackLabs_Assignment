var express = require('express');
var router = express.Router();
let employeeService = require("../services/employee");

//GET Employees
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  employeeService.getEmployees(req.body, (err,result) =>{
    if (err){
      res.status(400).send(err);
    }else{
      res.status(200).send(result);
    }
  })
});

//Createt Employee
router.post('/create', function(req, res) {
  employeeService.createEmployee(req.body, (err,result) =>{
    if (err){
      res.status(400).send(err);
    }else{
      res.status(200).send(result);
    }
  })
});

//Update Employee
router.put('/update', function(req, res) {
  employeeService.editEmployee(req.body, (err,result) =>{
    if (err){
      res.status(400).send(err);
    }else{
      res.status(200).send(result);
    }
  })
});

//Delete Emplpoyee
router.delete('/delete', function(req, res) {
  employeeService.deleteEmployee(req.body, (err,result) =>{
    if (err){
      res.status(400).send(err);
    }else{
      res.status(200).send(result);
    }
  })
});

module.exports = router;