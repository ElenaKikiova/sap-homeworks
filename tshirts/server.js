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

    console.log(info)

    dbo.collection("tshirts").insertOne(info, function(err1, res1) {
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
