import React from 'react'
import PlaylistsStyles from '../styles/playlists_n_tracks_container.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
	
	

class PlaylistButtons extends React.Component {
	render() { 

	
		
		return (
			<div className="button-container">
				<button type="button"
					className="btn playlist-button"
					onClick={() => this.props._changePlaylist(this.props.playlistName) }
				>
					{this.props.playlistName}
				</button>

			</div>
		)
	}
}


export default PlaylistButtons
// <div className="soundcloud-container">
// 			  <Tabs
//           onChange={this.handleChange}
//           value={this.state.slideIndex}
//         />
//         <Tab label="SoundCloud Playlists" value={0} />
//         <Tab label="Partify Playlists" value={1} />
//         <Tab label="My Likes" value={2} />
        
//         <SwipeableViews
//           index={this.state.slideIndex}
//           onChangeIndex={this.handleChange}
//         >

//         <div>
//          <h2 style={styles.headline}>Soundcloud Playlists</h2>
				  
//         </div>

//         <div>
//         	<h2 style={styles.headline}>Partify Playlists</h2>
//         </div>

//         <div style={styles.slide}>
//           <h2 style={styles.headline}>My Likes </h2>
//         </div>
//         </SwipeableViews>
// 			</div>