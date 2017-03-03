'use strict';

//http://localhost:8080/generate?b=Arduino%20Uno&s=Simple%20Ethernet&e=Widgets/RTC

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var favicon = require('serve-favicon');

var gen   = require("./index.js");

var app = express();
var port = process.env.PORT || 8080;
var publicPath = path.resolve('./public/');

app.use(favicon(__dirname + '/public/favicon.png'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(serveStatic(publicPath, {'index': ['index.html', 'index.htm']}));

app.get('/listBoards', function(req, res) {
  res.send(JSON.stringify(gen.listBoards()));
});

app.get('/listExamples', function(req, res) {
  res.send(JSON.stringify(gen.listExamples()));
});

app.get('/getBoardShields', function(req, res) {
  var board = req.query.b;
  res.send(JSON.stringify(gen.getBoardShields(board)));
});

app.get('/generate', function(req, res) {
  var board = req.query.b;
  var shield = req.query.s;
  var example = req.query.e;
  res.send(gen.generate(board, shield, example));
});

var server = app.listen(port);
var address = server.address();
var serverLocation = "http://localhost:"+address.port+"/";
console.log("Server running at", serverLocation);