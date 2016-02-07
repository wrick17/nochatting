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

      socket.on('chats', function(chats, msg){
        if (msg && msg.name !== localStorage.getItem('name'))
          notification();
        that.props.dispatch(updateChats(chats));
      });
    }
  }

  componentWillMount() {
    this.makeConnection();
  }

  editUserName() {
    this.refs.nameEntryBox.handleOpen();
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

  render() {
    return (
      <div className="chat-room">
        <Header editUserName={this.editUserName} />
        <MessageList chats={this.props.chats} self={localStorage.getItem('name')} />
        <MessageInput ref="messageInput" sendMessage={this.sendMessage} />
        <NameDialog users={this.props.users} ref="nameEntryBox" userCreated={this.userCreated} modalClosed={this.modalClosed} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { chats: state.chats, users: state.users }
}

export default connect(mapStateToProps)(ChatRoom);