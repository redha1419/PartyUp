const express  = require('express');
var bodyParser = require("body-parser");
const app      = express();
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS, to make our server public even when using different location
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  //res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

//grab our routes in users and interface
const users = require('./routes/users'); 
const songs = require('./routes/songs'); 

require('dotenv').config(); //grab our environment variables


app.use('/', users); //set our routes to the "/" location
app.use('/', songs); //set our routes to the "/" location

app.listen(process.env.PORT, function() {
  console.info("==> 🌎 Peep port %s.", process.env.PORT);
})
