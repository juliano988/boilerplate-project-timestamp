// server.js
// where your node app starts

//Global variables
let actualYear = new Date().getFullYear();
let actualMonth = new Date().getMonth();
let actualDay = new Date().getDate();
let randomDate = Math.floor(Math.random()*(actualYear-1970)+1970).toString(10)+'-'+
                   Math.floor(Math.random()*actualMonth+1).toString(10)+'-'+
                   Math.floor(Math.random()*actualDay+1).toString(10);

// init project
var express = require('express');
var app = express();
const bodyParser = require('body-parser')
const multer = require('multer') // v1.0.5
const upload = multer() // for parsing multipart/form-data

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// To manage the .env file:
require('dotenv').config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  
  res.sendFile(__dirname + '/views/index.html');
});

app.post("/random-date",function(req,res){
  res.redirect('/api/timestamp/' + randomDate);
});

app.get('/api/timestamp/' + randomDate,function(req,res){
  res.send(randomDate);
});

app.get("/api/timestamp/",function(req,res){
  res.json({unix: Date.parse(req.query.date)});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
