import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class NameDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: '',
      name: localStorage.getItem('name') || ''
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.submitName = this.submitName.bind(this);
  }

  componentWillMount() {
    if (!localStorage.getItem('name'))
      return this.handleOpen();
    this.props.userCreated();
  }

  componentDidUpdate() {
    if (this.refs.name)
      this.refs.name.focus();
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
    this.props.modalClosed();
  }

  submitName(e) {
    e.preventDefault();
    let name = this.refs.name.getValue();
    if (name === '') {
      this.setState({
        error: 'Please set a name'
      });
    }
    else if (name !== this.state.name && this.props.users.indexOf(name) !== -1)
      this.setState({
        error: 'This name is already taken'
      });
    else {
      localStorage.setItem('name', name);
      this.props.userCreated();
      this.setState({
        name: name
      });
      this.handleClose();
    }
  }

  render() {
    return (
      <Dialog
        title="Please enter your name"
        modal={true}
        open={this.state.open}
        onRequestClose={this.props.modalClosed}
        contentStyle={{
          width: '100%',
          maxWidth: '400px'
        }}>
        <form className="name-dialog" onSubmit={this.submitName}>
          <TextField className="name-box" autoComplete="off" hintText="Enter your name here" defaultValue={this.state.name} ref="name" errorText={this.state.error} required={true} />
          <FlatButton
            label="Save"
            type="submit"
            secondary={true}
            style={{ float: 'right' }}
          />
          <FlatButton
            label="Cancel"
            disabled={(this.state.name === '')}
            primary={true}
            onTouchTap={this.handleClose}
            style={{ float: 'right' }}
          />
        </form>
      </Dialog>
    );
  }
}