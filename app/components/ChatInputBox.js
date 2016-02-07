import React from 'react';
import EmojiPicker from 'react-emoji-picker';
import emojiMap from 'react-emoji-picker/lib/emojiMap';

export default class ChatInputBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      emojiPickerOpen: false
    };
    this.toggleEmojiPicker = this.toggleEmojiPicker.bind(this);
    this.closeEmojiPicker = this.closeEmojiPicker.bind(this);
    this.setEmoji = this.setEmoji.bind(this);
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
  }

  render() {
    return (
      <div className="chat-input-box">
        { this.state.emojiPickerOpen ? <EmojiPicker onSelect={this.setEmoji} /> : null}
        <div>
          <button onClick={this.toggleEmojiPicker} >O</button>
          <input onClick={this.closeEmojiPicker} type="text" />
        </div>
      </div>
    );
  }
}