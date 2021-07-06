//getDepartments
exports.getDepartments = (callback) => {
  executeQuery.query(sqlQueryMap['getDepartments'],
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

//CreateDepartments
exports.createDepartments = (data, callback) => {
  executeQuery.query(sqlQueryMap['insertDepartments'],
    [data.name], (err, result) => {
      if (err) {
        console.log("err", err);
        callback(err, null);
      } else {
        console.log("result", result.rows[0].id);
        callback(null, result.rows[0].id);
      }
    });
}

//UpdateDepartments
exports.editDepartments = (data, callback) => {
  executeQuery.query(sqlQueryMap['updateDepartments'],
    [data.name, data.id], (err, result) => {
      if (err) {
        console.log("err", err);
        callback(err, null);
      } else {
        console.log("result", result);
        callback(null, result.rowCount);
      }
    });
}

//DeleteDepartments
exports.deleteDepartments = (data, callback) => {
  executeQuery.query(sqlQueryMap['deleteDepartments'],
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