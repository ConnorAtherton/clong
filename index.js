var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/lib',  express.static(__dirname + '/lib'));

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendfile('demo/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('some_event', function(msg){
    console.log(msg);
     io.emit('move_event', {x: msg+50, y: 50});
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});
