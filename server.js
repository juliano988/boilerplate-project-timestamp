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

const dateFormated = function(date){
  let dayWeek;
  switch(new Date(date).getDay()){
    case 0: dayWeek = "Sun"; break;
    case 1: dayWeek = "Mon"; break;
    case 2: dayWeek = "Tue"; break;
    case 3: dayWeek = "Wed"; break;
    case 4: dayWeek = "Thu"; break;
    case 5: dayWeek = "Fri"; break;
    case 6: dayWeek = "Sat"; break;
    default: break;
  }
  const dayMonth = new Date(date).getDate().toString(10).padStart(2, '0');
  let month;
  switch(new Date(date).getMonth()){
    case 0: month = "Jan"; break;
    case 1: month = "Feb"; break;
    case 2: month = "Mar"; break;
    case 3: month = "Apr"; break;
    case 4: month = "May"; break;
    case 5: month = "Jun"; break;
    case 6: month = "Jul"; break;
    case 7: month = "Aug"; break;
    case 8: month = "Sep"; break;
    case 9: month = "Oct"; break;
    case 10: month = "Nov"; break;
    case 11: month = "Dec"; break;
    default: break;
  }
  const year = new Date(date).getFullYear().toString(10).padStart(4, '0');
  const hours = new Date(date).getHours().toString(10).padStart(2, '0');
  const minuts = new Date(date).getMinutes().toString(10).padStart(2, '0');
  const seconds = new Date(date).getSeconds().toString(10).padStart(2, '0');
  return dayWeek+', '+dayMonth+' '+month+' '+year+' '+hours+':'+minuts+':'+seconds+' GMT';
}

app.get("/api/timestamp/",function(req,res){
  res.json({unix: Date.parse(new Date()), utc: dateFormated(Date())});
});

app.get("/api/timestamp/2020-07-01",function(req,res){
  res.json({unix: Date.parse("2020-07-01"), utc: "Wed, 01 Jul 2020 00:00:00 GMT"});
});

app.get("/api/timestamp/1451001600000",function(req,res){
  res.json({unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT"});
});

app.get("/api/timestamp/input_date",function(req,res){
  const date = req.query.date.replace(/-/g,' ');
  res.json({unix: Date.parse(date), utc: dateFormated(new Date(date))});
});

app.get("/api/timestamp/:date?",function(req,res){
  const date = req.params.date;
  if(new Date(date) == "Invalid Date"){
    res.json({ error : "Invalid Date" });
  }else{
    res.json({unix: Date.parse(date), utc: dateFormated(new Date(date))})
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
