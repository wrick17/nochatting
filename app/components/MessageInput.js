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
    this.message.focus();
  }

  componentDidUpdate() {
    this.focus();
  }

  setMessage(e) {
    if (e.target.value !== '')
      return this.setState({
        message: e.target.value
      });
  }

  submitMessage(e) {
    e.preventDefault();
    if (this.message && this.message.getValue() !== '') {
      this.props.sendMessage(this.message.getValue());
      this.closeEmojiPicker();
      this.message.refs.input.value = '';
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
    console.log(emoji);
    this.message.refs.input.value = this.message.getValue() + ' ' + emoji + ' ';
  }

  render() {
    let iconStyles = {
      margin: '13px 0 0'
    }
    console.log('render');
    return (
      <form className="message-input" onSubmit={this.submitMessage} >
        { this.state.emojiPickerOpen ? <EmojiPicker onSelect={this.setEmoji} /> : null}
        <div className="message-input-box">
          <FontIcon className="material-icons" style={iconStyles} color={Colors.cyan500} onTouchTap={this.toggleEmojiPicker} >mood</FontIcon>
          <TextField ref={(ref) => this.message = ref} hintText="Enter your messge here" autoComplete="off" onClick={this.closeEmojiPicker} onBlur={this.setMessage} className="message-input-box" required={true} />
          <FontIcon className="material-icons" style={iconStyles} color={Colors.cyan500} onTouchTap={this.submitMessage} >send</FontIcon>
        </div>
      </form>
    );
  }
}