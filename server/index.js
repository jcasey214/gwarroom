var express = require('express');
var http = require('http');
var port = process.env.PORT || 8000
var warroom = require('./warroom-client');

var app = express();
var mongo = require('mongodb');
var unirest = require('unirest');
var server = http.Server(app);
var io = require('socket.io')(server);

var dbUrl = (process.env.MONGOLAB_URI || 'mongodb://localhost:27017/') + 'gwar';
var promise = require('promise')

var database = {
  connect: function(){
    return new promise(function(resolve, reject){
      mongo.MongoClient.connect('mongodb://localhost:27017/gwar', function(err, db){
        if(err){
          console.log(err);
          reject(err);
        }else{
          resolve(db);
        }
      })
    })
  }
}

var result = {};
function findAverage(arr){
  arr.forEach(function(server, i){
    if (result.hasOwnProperty(server.id)){
      result[server.id].total += parseFloat(server.responseTime);
      result[server.id].count += 1;
    }else{
      result[server.id] = {
        total : parseFloat(server.responseTime),
        count : 1,
        avg : function(){
          return this.total / this.count;
        }
      }
    }
  })
  return result;
}

io.on('connection', function (socket){
  warroom(function(error, data){
    var average = findAverage(data.data);
    database.connect().then(function(db){
      db.collection('status').insert(data.data, function(error, response){
      })
      db.close();
    })
    for(var i = 0; i < data.data.length; i += 1){
      for(key in average){
        console.log(data.data[i]);
        console.log(key);
        console.log(average[key].avg());
        if(parseInt(data.data[i].id) == parseInt(key)){
          data.data[i].avg = average[key].avg();
          console.log('here', data.data[i]);
        }
      }
    }
    socket.emit('servers', data)
  })
})

app.use('/', express.static('public'));

server.listen(port, function(){
  console.log('server is listening');
});
