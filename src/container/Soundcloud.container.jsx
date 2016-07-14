import React from 'react';
import PlaylistButton from '../components/PlaylistButton.jsx';
import PlaylistItem from '../components/PlaylistItem.jsx'
import Tabs from 'muicss/lib/react/tabs';
import SoundcloudStyles from '../styles/soundcloud_container.css';
import Tab from 'muicss/lib/react/tab';



class SoundcloudContainer extends React.Component {
	
	render() {
		
		const PlaylistButtonList = this.props.playlists.length > 1 
		?	this.props.playlists.map((playlist, index) => 
				<PlaylistButton playlistName={playlist.name} _changePlaylist={this.props._changePlaylist} key={index} /> 
			) 
		: <p>Nothing</p> ;

		
console.log(this.props)

		return (

			<div>
					<div className="soundcloud-container">
						<h2>Your Soundcloud Playlists:</h2>
		  				<div className="playlist-songs">
		  					{PlaylistButtonList}
		  				</div>
							<div>
								<PlaylistItem playlist={this.props.chosenPlaylist} addToQueue={this.props._addToQueue} /> 
							</div>
					</div>
					
			</div>
		)
	}
}


export default SoundcloudContainer



