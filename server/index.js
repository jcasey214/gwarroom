var express = require('express');
var socket = require('socket.io');
var http = require('http');

var app = express();
var mongo = require('mongodb');
var unirest = require('unirest');
var io = socket(server);
var server = http.Server(app);

app.use('/', express.static('public'));

// app.get('/', function(req, res){
//   res.send('hello world');
//   console.log(__dirname);
// })

app.get('/wtf', function(request, response){
  response.send('What the fuck');
})


server.listen(80, function(){
  console.log('listening on port 8000');
});
