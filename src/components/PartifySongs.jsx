import React from 'react'
import PlaylistsStyle from '../styles/playlists_n_tracks_container.css';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
var FontAwesome = require('react-fontawesome');

class PartifySongs extends React.Component { 
	constructor(props) { 
        super(props)
        this.state = {
        }
        this._addEffectClass = this._addEffectClass.bind(this);
    }
    
    _addEffectClass(song_uri) { 
        this.setState({ 
            clickedSong: song_uri
        })
    } 

	render() { 
			const self = this
			let chosenPlaylist = this.props.chosenPlaylist;
			let _addToQueue = this.props._addToQueue;
			const addGylph = <FontAwesome className='add-glyph' name='plus-square' size='2x' />
			const heartGlyph = <FontAwesome className='glyph' name='heart-o' size='1x' />
			const playGlyph = <FontAwesome className='glyph' name='play' size='1x' />
			let showTrackInfo = chosenPlaylist.songs && chosenPlaylist.songs.map(function(song, index) { 
return ( 
                  <div key={index}
                      className={`${"track-row"} ${song.track_uri === self.state.clickedSong ? "animated pulse" : ""}`}
                      onClick= {() => { _addToQueue(song); self._addEffectClass(song.track_uri)}}>
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
			})

		return (			
			<div className="tracks-container">
				{showTrackInfo}		
			</div>
		)
	}
}

export default PartifySongs


