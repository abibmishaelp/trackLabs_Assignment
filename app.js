var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let parser = require('xml-js');
let fs = require('fs');
require('dotenv').config()
let bodyParser = require('body-parser');

let {
  Pool
} = require('pg');

var employeeRouter = require('./routes/employee');
var departmentRouter = require('./routes/departments');

var app = express();

let content = fs.readFileSync(__dirname + '/sql-queries.xml');
let json = parser.xml2json(content, {
  sanitize: false
})

// returns a string containing the JSON structure by default
let sqlQueries = JSON.parse(json)['elements'][1].elements
global.sqlQueryMap = {}
for (var i = 0; i < sqlQueries.length; i++) {
  if (sqlQueries[i]['attributes']) {
    sqlQueryMap[sqlQueries[i]['attributes']['id']] = sqlQueries[i]['elements'][0]['cdata'];
  }
}

//DBConnections
let pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  max: 100,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 30000,
  maxUses: 7500
})

pool.connect((err, client, release) => {
  if (err) {
    console.log("Error In Db Connection", err);
  } else {
    console.log("Connected to DB");
    global.executeQuery = client;
    global.release = release;
  }
})

pool.on('connect', (connection) => {
  console.log("Connection Established");
})
pool.on('acquire', (connection) => {
  console.log('Connection %d acquired', connection.processID);
});

pool.on('error', () => {
  console.log('Waiting for available connection slot');
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(bodyParser.json({
  limit: '50mb'
}))
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));


app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/employee', employeeRouter);
app.use('/departments', departmentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
