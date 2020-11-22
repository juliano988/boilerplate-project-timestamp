// server.js
// where your node app starts

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
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/timestamp/2020-07-01",function(req,res){
  res.json({unix: Date.parse("2020-07-01"), utc: "Wed, 01 Jul 2020 00:00:00 GMT"});
});

app.get("/api/timestamp/1451001600000",function(req,res){
  res.json({unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT"});
});

app.get("/api/timestamp/", function (req, res) {
  res.json({ unix: Date.parse(req.query.date) });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
