const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');


var ToursRoutes = require('./routes/tours');
var UserRoutes = require('./routes/user');
// const swaggerDocs = require('./app/config/swaggerDef') ;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client

app.use((req , res ,next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
     "GET, POST, PATCH, DELETE, PUT, OPTIONS"
   );
  next();
});

app.use('/tours',  ToursRoutes);
app.use('/users', UserRoutes);
// swaggerDocs(app);

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));



module.exports = app ;
