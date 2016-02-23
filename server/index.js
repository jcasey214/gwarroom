var express = require('express');
var http = require('http');
var port = process.env.PORT || 8000
var warroom = require('./warroom-client');

var app = express();
var mongo = require('mongodb');
var unirest = require('unirest');
var server = http.Server(app);
var io = require('socket.io')(server);


app.get('/api/servers', function(request, response, next){
  warroom(function(error, data){
    response.json({servers: data.data})
  })
});


app.get('api/servers/:id', function(request, response, next){

});

app.get('/test', function (request, response, next){
  warroom(function(error, data){
    response.send(data);
  })
})

io.on('connection', function (socket){
  warroom(function(error, data){
    socket.emit('servers', data)
  })
})

app.use('/', express.static('public'));

// app.get('/', function(req, res){
//   res.send('hello world');
//   console.log(__dirname);
// })




server.listen(port, function(){
  console.log('server is listening');
});
