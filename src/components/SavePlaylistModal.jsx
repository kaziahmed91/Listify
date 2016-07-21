import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class SavePlaylistModal extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
  	  open: false,
  	};
  	this._handleOpen=this._handeOpen.bind(this);
  	this._handleClose=this._handleClose.bind(this);
 	}

  _handleOpen() {
    this.setState({open: true});
  };

  _handleClose() {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this._handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onTouchTap={this._handleClose}
      />,
    ];

    return (
      <div>
      <MuiThemeProvider>
        <RaisedButton label="Modal Dialog" onTouchTap={this.handleOpen} />
        <Dialog
          title="What's Your new playlist called?"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          Only actions can close this dialog.
        </Dialog>
       </MuiThemeProvider>
     </div>
    );
  }
}

export default SavePlaylistModal
