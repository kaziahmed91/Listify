import React from 'react';
import SoundcloudStyles from '../styles/soundcloud_container.css';

class MessageContainer extends React.Component {
	render() {
		return(
			<div>
				{this.props.UserMessage}
			</div>
		)
	}
}

export default MessageContainer