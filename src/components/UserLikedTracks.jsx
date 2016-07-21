import React from 'react'
var FontAwesome = require('react-fontawesome');
import PlaylistsStyle from '../styles/playlists_n_tracks_container.css';

class UserLikedTracks extends React.Component { 
  constructor(props) { 
      super(props)
  }

  render() { 
    let userLikedTracks = this.props.userLikedTracks;
    let _addToQueue = this.props._addToQueue;
			const addGylph = <FontAwesome className='add-glyph' name='plus-square' size='2x' />
			const heartGlyph = <FontAwesome className='glyph' name='heart-o' size='1x' />
			const playGlyph = <FontAwesome className='glyph' name='play' size='1x' />
      
    return (  
			<div className="tracks-container">
        {userLikedTracks.songs.map(function(song, index) { 
					return ( 
						<div key={index} className="track-row"  onClick= {() => { _addToQueue(song) }}>
							<table>
								<tr className="track-title">
									<td>{addGylph}</td>
									<td id="name">{song.track_title}</td>
									<td>{heartGlyph}{song.track_likes}</td>
									<td></td>
									<td>{playGlyph}{song.track_playbacks}</td>
									<td></td>
								</tr>
							</table>
						</div>
					)
				})}				
			</div>
    )
  }
}

export default UserLikedTracks
