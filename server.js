var express = require('express');
var path = require('path');
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:8080/mydb";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
  });

var app = express();

var serverIP = '192.168.1.26';

app.use('/', express.static(__dirname + '/build/'));

//re-route to index.html on any unhandled request
app.get('/*', function(req, res){
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

server = app.listen(8080, serverIP, function(err) {
    if (err) {
        print('ERROR');
        print(err);
    }
    else {
        print(`now serving ${serverIP}:8080`);
    }
});

//helper method 
function print(string) {
    console.log(string);
}