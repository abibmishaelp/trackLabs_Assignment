var express = require('express');
var router = express.Router();
let departmentServices = require('../services/departments');

//GET Departments
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  departmentServices.getDepartments(req.body, (err,result) =>{
    if (err){
      res.status(400).send(err);
    }else{
      res.status(200).send(result);
    }
  })
});

//Create Departments
router.post('/create', function(req, res) {
  departmentServices.createDepartments(req.body, (err,result) =>{
    if (err){
      res.status(400).send(err);
    }else{
      res.status(200).send(result);
    }
  })
});

//Update Departments
router.put('/update', function(req, res) {
  departmentServices.editDepartments(req.body, (err,result) =>{
    if (err){
      res.status(400).send(err);
    }else{
      res.status(200).send(result);
    }
  })
});

//Delete Departments
router.delete('/delete', function(req, res) {
  departmentServices.deleteDepartments(req.body, (err,result) =>{
    if (err){
      res.status(400).send(err);
    }else{
      res.status(200).send(result);
    }
  })
});

module.exports = router;