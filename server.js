'use strict';

//http://localhost:8080/generate?b=Arduino%20Uno&s=Simple%20Ethernet&e=Widgets/RTC

var host = 'examples.blynk.cc';
var httpPort = 8080;
var httpsPort = 8443;

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var favicon = require('serve-favicon');
var hljs = require('highlight.js');

var http = require('http');
var https = require('https');
var fs = require('fs');
var sslPath = '/etc/letsencrypt/live/' + host +'/';

var gen   = require("./index.js");

var app = express();
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
  var auth = req.query.a;
  
  res.send(gen.generate(board, shield, example, auth));
});


app.get('/generate.html', function(req, res) {
  var board = req.query.b;
  var shield = req.query.s;
  var example = req.query.e;
  var auth = req.query.a;
  
  var code = gen.generate(board, shield, example, auth);
  var html = hljs.highlight("arduino", code).value;
  
  html =
`
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/styles/default.min.css">
  <link href='https://fonts.googleapis.com/css?family=Ubuntu%20Mono' rel='stylesheet'>

  <style>

  .hljs {
    font-family: "Ubuntu Mono", "Lucida Console", Monaco, monospace;
    font-size: 14px;
    background-color: #FAFAFA;
  }

  a:link, a:visited, a:active {
    color: #23C890;
  }

  a:hover {
    color: blue;
  }

  </style>
</head>
<body>

  <pre><code class="hljs sketch">`
  
  + html +

`  </code></pre>

</body>
</html>
`;

  res.send(html);
});

http.createServer(function(req, res) {
    res.writeHead(301, {"Location": "https://" + host + req.url});
    res.end();})
    .listen(httpPort);

https.createServer({
                      key: fs.readFileSync(sslPath + 'privkey.pem'),
                      cert: fs.readFileSync(sslPath + 'fullchain.pem')
                   }, app)
    .listen(httpsPort);

console.log("Server running at", "http://" + host + ":" + httpPort);
console.log("Server running at", "https://" + host + ":" + httpsPort);