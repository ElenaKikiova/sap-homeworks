var http = require('http');
const express = require('express');
const port = (process.env.PORT || 8080);

// App
var app = module.exports = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
var bodyParser = require('body-parser');
app.use(bodyParser());

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/tshirts";

var ObjectId = require('mongodb').ObjectID;

// Routes
app.get('/', function(req, res){
  res.render('index');
})

app.get('/getRecords', function(req, res){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;

    var dbo = db.db("tshirts");

    dbo.collection("tshirts").find({}).toArray(function(err1, res1) {
      if (err1) throw err1;
      console.log(res1);
      res.send(res1);
      db.close();
    });
  });
})

app.post('/addRecord', function(req, res){
  var info = req.body;

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;

    var dbo = db.db("tshirts");

    dbo.collection("tshirts").insertOne(info, function(err1, res1) {
      if (err1) throw err1;
      res.send({ message: "success" });
      db.close();
    });
  });
})

app.post('/editRecord', function(req, res){
  var info = req.body;

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;

    var dbo = db.db("tshirts");

    dbo.collection("tshirts").update(
      {_id: ObjectId(info.id)},
      { $set: {
          Name: info.Name,
          Type: info.Type,
          Size: info.Size,
          Color: info.Color
        }
      },
      function(err1, res1) {
        if (err1) throw err1;
        res.send({ message: "success" });
        db.close();
      }
    );
  });
})

app.post("/deleteRecord", function(req, res){
  var id = req.body.id;

  console.log(id);

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;

    var dbo = db.db("tshirts");

    console.log(id);

    dbo.collection("tshirts").remove({_id: ObjectId(id)}, function(err1, res1) {
      if (err1) throw err1;
      res.send({ message: "success" });
      db.close();
    });
  });
})

//LISTEN

app.listen(port, () => {
  console.log('Express server listening on port', port)
});
