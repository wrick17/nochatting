var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('./'));

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  var name = socket.handshake.query.name;

  socket.broadcast.emit('joined', name);

  socket.on('disconnect', function(){
    socket.broadcast.emit('left', name);
  });

  socket.on('chat message', function(msg){
    msg.name = name;
    io.emit('chat message', msg);
  });
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});