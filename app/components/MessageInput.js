import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

export default class MessageInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
    this.submitMessage = this.submitMessage.bind(this);
    this.setMessage = this.setMessage.bind(this);
    this.focus = this.focus.bind(this);
  }

  focus() {
    this.refs.message.focus();
  }

  componentDidUpdate() {
    this.focus();
  }

  setMessage(e) {
    this.setState({
      message: e.target.value
    });
  }

  submitMessage(e) {
    e.preventDefault();
    this.props.sendMessage(this.state.message);
    this.setState({
      message: ''
    });
  }

  render() {
    return (
      <form className="message-input" onSubmit={this.submitMessage} >
        <TextField ref="message" hintText="Enter your messge here" autoComplete="off" value={this.state.message} onChange={this.setMessage} className="message-input-box" required={true} />
        <RaisedButton label="Send" secondary={true} onTouchTap={this.submitMessage} />
      </form>
    );
  }
}
