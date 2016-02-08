var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
var compression = require('compression');

import { createStore } from 'redux';

app.use(compression());
app.use(express.static(path.join('./')));

const initialState = {
  users: [],
  chats: []
};

function addUser (name) {
  return {
    type: 'ADD_USER',
    name: name
  }
}

function removeUser (name) {
  return {
    type: 'REMOVE_USER',
    name: name
  }
}

function updateUser (name, oldName) {
  return {
    type: 'UPDATE_USER',
    name: name,
    oldName: oldName
  }
}

function addChat (msg) {
  return {
    type: 'ADD_CHAT',
    id: msg.id,
    name: msg.name,
    message: msg.message
  }
}

function itemReducer( state = initialState, action ) {
  switch(action.type) {
    case 'ADD_USER':
      return Object.assign({}, state, {
        users: [
          ...state.users,
          action.name
        ]
      });
    case 'REMOVE_USER':
      return Object.assign({}, state, {
        users: [
          ...state.users.slice(0, state.users.indexOf(action.name)),
          ...state.users.slice(state.users.indexOf(action.name) + 1),
        ]
      });
    case 'UPDATE_USER':
      return Object.assign({}, state, {
        users: [
          ...state.users.slice(0, state.users.indexOf(action.oldName)),
          action.name,
          ...state.users.slice(state.users.indexOf(action.oldName) + 1),
        ]
      });
    case 'ADD_CHAT':
      return Object.assign({}, state, {
        chats: [
          ...state.chats,
          {
            id: action.id,
            name: action.name,
            message: action.message
          }
        ]
      });;
    default:
      return state;
  }
}

let store = createStore(itemReducer);

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/entry.html');
});

io.on('connection', function(socket){

  var userName;

  io.emit('users', store.getState().users);

  store.subscribe(() => {
    io.emit('chats', store.getState().chats);
  });

  store.subscribe(() => {
    io.emit('users', store.getState().users);
  });

  socket.on('user created', function(name){
    userName = name;
    store.dispatch(addUser(name));

    store.dispatch(addChat({
      id: store.getState().chats.length,
      name: 'system',
      message: name + ' has joined the chat'
    }));
  });

  socket.on('disconnect', function(){
    if (userName !== undefined) {
      store.dispatch(removeUser(userName));
      store.dispatch(addChat({
        id: store.getState().chats.length,
        name: 'system',
        message: userName + ' has left the chat'
      }));
    }
  });

  socket.on('user updated', function(name, oldName){
    store.dispatch(updateUser(name, oldName));
  });

  socket.on('chat message', function(msg){
    msg.id = store.getState().chats.length;
    io.emit('new message', msg);
    store.dispatch(addChat({
      id: msg.id,
      name: msg.name,
      message: msg.message
    }));
  });
});

http.listen(process.env.PORT || 3000, function(){
  console.log('server started');
});