import React from 'react'
import PlaylistsStyle from '../styles/playlists_container.css';


class PlaylistButton extends React.Component {
	render() { 
		
		return (
		<div>
			<div className="playlist-buttons-container">
				<button className="btn btn-default playlist-buttons" onClick={() => this.props._changePlaylist(this.props.playlistName)} > 
					{this.props.playlistName}
				</button>
			</div>
		</div>
		)
	}
}


export default PlaylistButton