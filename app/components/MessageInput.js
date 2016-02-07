import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import EmojiPicker from 'react-emoji-picker';
import emojiMap from 'react-emoji-picker/lib/emojiMap';
import FontIcon from 'material-ui/lib/font-icon';
import Colors from 'material-ui/lib/styles/colors';

export default class MessageInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      emojiPickerOpen: false
    };
    this.submitMessage = this.submitMessage.bind(this);
    this.setMessage = this.setMessage.bind(this);
    this.focus = this.focus.bind(this);
    this.toggleEmojiPicker = this.toggleEmojiPicker.bind(this);
    this.closeEmojiPicker = this.closeEmojiPicker.bind(this);
    this.setEmoji = this.setEmoji.bind(this);
  }

  focus() {
    this.refs.message.focus();
  }

  componentDidUpdate() {
    this.focus();
  }

  setMessage(e) {
    this.setState({
      message: e.target.value,
      emojiPickerOpen: false
    });
  }

  submitMessage(e) {
    e.preventDefault();
    if (this.state.message !== '') {
      this.props.sendMessage(this.state.message);
      this.setState({
        message: '',
        emojiPickerOpen: false
      });
    }
  }
  toggleEmojiPicker() {
    this.setState({
      emojiPickerOpen: !this.state.emojiPickerOpen
    });
  }

  closeEmojiPicker() {
    this.setState({
      emojiPickerOpen: false
    });
  }

  setEmoji(emoji) {
    this.setState({
      message: this.state.message + ' ' + emoji
    });
    this.refs.message.focus();
  }

  render() {
    let iconStyles = {
      margin: '13px 0 0'
    }
    return (
      <form className="message-input" onSubmit={this.submitMessage} >
        { this.state.emojiPickerOpen ? <EmojiPicker onSelect={this.setEmoji} /> : null}
        <div className="message-input-box">
          <FontIcon className="material-icons" style={iconStyles} color={Colors.cyan500} onTouchTap={this.toggleEmojiPicker} >mood</FontIcon>
          <TextField ref="message" hintText="Enter your messge here" autoComplete="off" onClick={this.closeEmojiPicker} value={this.state.message} onChange={this.setMessage} className="message-input-box" required={true} />
          <FontIcon className="material-icons" style={iconStyles} color={Colors.cyan500} onTouchTap={this.submitMessage} >send</FontIcon>
        </div>
      </form>
    );
  }
}
