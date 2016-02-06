import React from 'react';
import AppBar from 'material-ui/lib/app-bar';

export default class Header extends React.Component {
  render() {
    return (
      <AppBar
        title="Chat Room"
        onLeftIconButtonTouchTap={this.props.editUserName}
      />
    );
  }
}