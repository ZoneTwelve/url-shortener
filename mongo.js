var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var database = null;
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("service");
  database = db;
  let hash = Number( new Date() ).toString(16);
  console.log( hash );
  //dbo.createCollection("urls", function(err, res) {
    //if (err) throw err;
    //console.log("Collection created!");
    //db.close();
  //});
  dbo.collection("urls").insertOne( {
    url:"https://www.youtube.com/watch?v=dQw4w9WgXcQ", hash
  } );
}); 