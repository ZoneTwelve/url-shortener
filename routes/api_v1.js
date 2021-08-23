var express = require('express');
var router = express.Router();

router.get('/s/:hash', function(req, res, next) {
  let { hash } = req.params;
  res.database.collection("urls").find({ hash:"17b732fc40d" }).toArray(function(err, result) {
    if (err) throw err;
    if( result.length > 0 ){
      let { url } = result[0];
      res.redirect( url );
    }else{
      res.send("not found");
    }
    //console.log(result);
  });

});

router.post("/new", ( req, res ) => {
  let redirect = req.body.url;
  let pattern = Number(new Date()).toString(16);
  res.database.collection("urls").insertOne({
    url:  redirect,
    hash: pattern
  }, function(err, res) {
    if (err) throw err;
    //console.log("1 document inserted");
  });
  res.database.collection("urls").insertOne( {
    url:"https://www.youtube.com/watch?v=dQw4w9WgXcQ", hash
  } );
});

router.get("/count", ( req, res ) => {
  res.database.collection("urls").find({ hash:"17b732fc40d" }).toArray(function(err, result) {
    if (err) throw err;
    //console.log(result);
    res.send( result );
  });
})

module.exports = router;
