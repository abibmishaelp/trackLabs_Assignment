//getEmployees
exports.getEmployees = (callback) => {
  executeQuery.query(sqlQueryMap['getEmployees'],
    [], (err, result) => {
      if (err) {
        console.log("err", err);
        callback(err, null);
      } else {
        console.log("result", result.rows);
        callback(null, result.rows);
      }
    });
}

//CreatEmployees
exports.createEmployee = (data, callback) => {
  executeQuery.query(sqlQueryMap['insertEmployees'],
    [data.name, data.age, data.address, data.salary, data.dept_id], (err, result) => {
      if (err) {
        console.log("err", err);
        callback(err, null);
      } else {
        console.log("result", result.rows[0].id);
        callback(null, result.rows[0].id);
      }
    });
}

//UpdateEmployees
exports.editEmployee = (data, callback) => {
  executeQuery.query(sqlQueryMap['updateEmployees'],
    [data.name, data.age, data.address, data.salary, data.dept_id, data.id], (err, result) => {
      if (err) {
        console.log("err", err);
        callback(err, null);
      } else {
        console.log("result", result);
        callback(null, result.rowCount);
      }
    });
}

//deleteEmployees
exports.deleteEmployee = (data, callback) => {
  executeQuery.query(sqlQueryMap['deleteEmployees'],
    [data.id], (err, result) => {
      if (err) {
        console.log("err", err);
        callback(err, null);
      } else {
        console.log("result", result);
        callback(null, result.rowCount);
      }
    });
}