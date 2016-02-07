var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
var compression = require('compression');

app.use(compression());
app.use(express.static(path.join('./')));

var users = [];
var chats = [];

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/entry.html');
});

io.on('connection', function(socket){

  io.emit('users', users);

  var userName;

  socket.on('user created', function(name){
    users.push(name);
    userName = name;
    io.emit('users', users);
    chats.push({
      id: chats.length,
      name: 'system',
      message: name + ' has joined the chat'
    });
    io.emit('chats', chats);
  });

  socket.on('disconnect', function(){
    if (userName !== undefined) {
      users.splice(users.indexOf(userName), 1);
      io.emit('users', users);
      chats.push({
        id: chats.length,
        name: 'system',
        message: userName + ' has left the chat'
      });
      io.emit('chats', chats);
    }
  });

  socket.on('chat message', function(msg){
    msg.id = chats.length;
    chats.push(msg);
    io.emit('chats', chats);
  });
});

http.listen(process.env.PORT || 3000, function(){
  console.log('server started');
});