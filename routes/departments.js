var express = require('express');
var router = express.Router();
let departmentServices = require('../services/departments');

//GET Departments
router.get('/', function (req, res) {
  // res.render('index', { title: 'Express' });
  departmentServices.getDepartments((err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  })
});

//Create Departments
router.post('/', function (req, res) {
  departmentServices.createDepartments(req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  })
});

//Update Departments
router.put('/', function (req, res) {
  departmentServices.editDepartments(req.body, (err, result) => {
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

//Delete Departments
router.delete('/', function (req, res) {
  departmentServices.deleteDepartments(req.body, (err, result) => {
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