var express = require('express');
var path = require('path');
const mongoose = require('mongoose');
const User = require('./model/User.js');
const bodyParser = require('body-parser');

var db_url = "mongodb://localhost:27017/mydb";

var app = express();
var serverIP = 'localhost'

mongoose.connect(db_url, {useNewUrlParser:true});
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to database');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Testing Signup endpoint. 
app.post('/api/v1/signup', (req, res)  => {
    // TODO: Probably want to do ID validation here.
    const user = new User({name:'test', password:'test', email:'testing@test.com'});
    console.log('Creating a test user.');
    user.save().then(()=>{
        console.log('test user created');
        return res.status(201).send({
            success: 'true',
            message: 'Test user created'
        });
    });
});

// TODO: Create a GET method to test getting data from mongodb via ID, After IDs are added to the User schema.

app.use('/', express.static(__dirname + '/build/'));

//re-route to index.html on any unhandled request
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

server = app.listen(8080, serverIP, function (err) {
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