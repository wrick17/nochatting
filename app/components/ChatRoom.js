import React from 'react';
import Header from './Header';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import NameDialog from './NameDialog';
import notification from './Notification';
import { connect } from 'react-redux';
import { updateChats, updateUsers, addNewJoinee } from '../actions';
import io from 'socket.io-client';

var socket;

class ChatRoom extends React.Component {

  constructor(props) {
    super(props);
    this.userCreated = this.userCreated.bind(this);
    this.editUserName = this.editUserName.bind(this);
    this.makeConnection = this.makeConnection.bind(this);
    this.modalClosed = this.modalClosed.bind(this);
  }

  makeConnection() {
    if (!socket) {

      socket = io();

      var that = this;

      socket.on('users', function(users) {
        that.props.dispatch(updateUsers(users));
      });

      socket.on('new joinee', function(name) {
        that.props.dispatch(addNewJoinee(name));
      });

      socket.on('chats', function(chats) {
        that.props.dispatch(updateChats(chats));
      });

      socket.on('new message', function(msg) {
        if (msg && msg.name !== localStorage.getItem('name'))
          notification(msg);
      });
    }
  }

  componentWillMount() {
    this.makeConnection();
  }

  editUserName() {
    this.refs.nameEntryBox.getWrappedInstance().handleOpen();
  }

  modalClosed() {
    this.refs.messageInput.focus();
  }

  sendMessage(message) {
    socket.emit('chat message', {
      name: localStorage.getItem('name'),
      message: message
    });
  }

  userCreated() {
    var name = localStorage.getItem('name');
    socket.emit('user created', name);
  }

  userUpdated(oldName) {
    var name = localStorage.getItem('name');
    socket.emit('user updated', name, oldName);
  }

  render() {
    return (
      <div className="chat-room">
        <Header editUserName={this.editUserName} />
        <MessageList />
        <MessageInput ref="messageInput" sendMessage={this.sendMessage} />
        <NameDialog ref="nameEntryBox" userCreated={this.userCreated} userUpdated={this.userUpdated} modalClosed={this.modalClosed} />
      </div>
    );
  }
}

export default connect()(ChatRoom);