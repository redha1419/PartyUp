const express  = require('express');
var bodyParser = require("body-parser");
const app      = express();
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS, to make our server public even when using different location
 app.use((req, res, next)=> {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
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
