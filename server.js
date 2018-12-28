var express = require('express');
var path = require('path');

var app = express();

var serverIP = '10.39.83.233';

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