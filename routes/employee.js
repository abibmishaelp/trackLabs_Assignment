var express = require('express');
var router = express.Router();
let employeeService = require("../services/employee");

//GET Employees
router.get('/', function (req, res) {
  // res.render('index', { title: 'Express' });
  employeeService.getEmployees((err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  })
});

//Createt Employee
router.post('/', function (req, res) {
  employeeService.createEmployee(req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  })
});

//Update Employee
router.put('/', function (req, res) {
  employeeService.editEmployee(req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      if (result >= 1) {
        res.status(200).send("Updated Successfully");
      } else {
        res.status(400).send("Id Not Found");
      }
    }
  })
});

//Delete Emplpoyee
router.delete('/', function (req, res) {
  employeeService.deleteEmployee(req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      if (result >= 1) {
        res.status(200).send("Deleted Successfully");
      } else {
        res.status(400).send("Id Not Found");
      }
    }
  })
});

module.exports = router;