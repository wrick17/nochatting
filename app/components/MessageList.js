import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import ReactEmoji from 'react-emoji';
import { connect } from 'react-redux';

class MessageList extends React.Component {

  componentDidUpdate() {
    let messages = this.refs.messages;
    messages.scrollTop = messages.scrollHeight;
  }

  render() {
    var that = this;
    var self = localStorage.getItem('name');
    var messagesList = this.props.chats.map( function(chat) {
      let avatar = "https://robohash.org/" + chat.name;
      if (chat.name === 'system') {
        if (chat.message.includes(self))
          chat.message = chat.message.replace(self + ' has', 'You have');
        return(
          <ListItem
            key={chat.id}
            secondaryText={chat.message}
            disabled={true}
            secondaryTextLines={1}
            style={{
              textAlign: 'center',
              paddingTop: '5px',
              paddingBottom: '15px'
            }}
          />
        );
      }
      if (self === chat.name) {
        return(
          <ListItem
            rightAvatar={<Avatar src={avatar} style={{ top: '10px' }} />}
            key={chat.id}
            primaryText={chat.name}
            secondaryText={ReactEmoji.emojify(chat.message)}
            disabled={true}
            secondaryTextLines={2}
            style={{
              paddingTop: '10px',
              paddingBottom: '10px',
              textAlign: 'right',
              paddingRight: '72px'
            }}
          />
        );
      }
      return (
        <ListItem
            leftAvatar={<Avatar src={avatar} style={{ top: '10px' }} />}
            key={chat.id}
            primaryText={chat.name}
            secondaryText={ReactEmoji.emojify(chat.message)}
            disabled={true}
            secondaryTextLines={2}
            style={{
              paddingTop: '10px',
              paddingBottom: '10px'
            }}
          />
      );
    });
    return (
      <div ref="messages" className="messages">
        <List>
          { messagesList }
        </List>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { chats: state.chats }
}

export default connect(mapStateToProps)(MessageList);