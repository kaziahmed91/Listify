import React from 'react'
import PlaylistsStyle from '../styles/playlists_container.css';

class PlaylistItem extends React.Component { 
	render() { 
			console.log(this.props.playlist)
			let playlist = this.props.playlist
		return (
			
			<div>
			{playlist.songs && playlist.songs.map(function(song, index) { 
					return ( 

						<div key={index} addclass="music-title">
							<a href="" onClick= {() => this.props._addToQueue.bind(this)} >{song.track_title}</a>
						</div>
					)
				})}
			</div>
		)
	}
}

export default PlaylistItem


// clear: both to fix> 

// {song.track_uri}