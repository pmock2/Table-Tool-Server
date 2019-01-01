var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/table-tool-mongodb";

MongoClient.connect(url, function(err, db) {
  if (err) {
    throw err;
  }
  
  var dbo = db.db("table-tool-mongodb");

  dbo.createCollection("users", function(err, res) {
    if (err) {
      throw err;
    }

    console.log("Users table created!");

    db.close();
  });
});
