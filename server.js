var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var routes = require('./routes/routes');
var mongoCredentials = require('./mongocredentials');
var mongoURL = mongoCredentials.url;
var mongoose = require("mongoose");
var db = mongoose.connection;
var cors = require('cors');
var cookieParser = require('cookie-parser');

var IP = 'localhost';

mongoose.connect(mongoURL);

//Called when there is an error connecting to mongoDB
db.on('error', console.error.bind(console, 'connection error:'));
//Called when successfully connected to MongoDB
db.once('open', function callback() {
  console.log('DB connection opened');
});

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(cookieParser());
app.use(bodyParser.json());

app.use(cors({
  credentials: true,
  origin: true,
  preflightContinue: true,
  allowedHeaders: 'Content-Type,X-Requested-With,accept',
  methods: "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS"
}));
//points to directory that holds views and controllers
app.use(express.static(__dirname + '/public'));


//Points incomming request to routes files(Where API's Live)
routes(app);


app.listen(3001, IP, function () {
  console.log(`Listening on ${IP}:3001!`);
});