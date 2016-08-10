import React from 'react'
import PlaylistsStyle from '../styles/playlists_n_tracks_container.css';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
var FontAwesome = require('react-fontawesome');
import classnames from "classnames"

class SoundcloudSongs extends React.Component { 
  constructor(props) { 
    super(props)
      this.state = {
      }
      this._addEffectClass = this._addEffectClass.bind(this);
      this._checkSongQueue = this._checkSongQueue.bind(this);
      this._passQueueInfo = this._passQueueInfo.bind(this);
      this._renderIcon = this._renderIcon.bind(this);
  }

  _passQueueInfo() { 
  this.props.nextToPlay
}
  
  _addEffectClass(song_uri) { 
      this.setState({ 
          clickedSong: song_uri,
          clicked: true
      })
  } 

  _checkSongQueue() { 
    let currentQueue = this.props.nextToPlay;
    let songSelected = this.state.clickedSong; 
    let selectionFound = currentQueue.length > 0 && currentQueue.indexOf(songSelected) > 0
  }

  _renderIcon(song) { 
    const addGylph = <FontAwesome className='add-glyph' name='plus-square' size='2x' />
    const checkGylph = <FontAwesome className='add-glyph' name='check-square' size='2x' />
    const currentlyPlaying = <FontAwesome className='add-glyph' name='youtube-play' size='2x' />

    if ((this.props.nextToPlay && this.props.nextToPlay.length > 0) && (this.props.nextToPlay.indexOf(song) > 0)) { 
      return checkGylph
    } else if (song === this.props.currentlyPlaying) { 
      return currentlyPlaying
    } else { 
      return addGylph
    }
  }
  

  render() { 
    const self = this
    let chosenPlaylist = self.props.chosenPlaylist;
    let _addToQueue = self.props._addToQueue;
    const heartGlyph = <FontAwesome className='glyph' name='heart-o' size='1x' />
    const playGlyph = <FontAwesome className='glyph' name='play' size='1x' />

    console.log("current song Queue:" , self.props.nextToPlay)

// <td> { (self.props.nextToPlay.length > 0 && self.props.nextToPlay.indexOf(song.track_uri)) > 0 ?
//                     checkGylph : addGylph } 
//                     </td>


    let showTrackInfo = chosenPlaylist.songs && chosenPlaylist.songs.map(function(song, index) { 
      return ( 

        <div 
          key={index}
          className= {` 
            ${"track-row"} 
            ${song.track_uri === self.state.clickedSong ? "animated pulse" : ""} 
            ${(self.props.nextToPlay.length > 0 && self.props.nextToPlay.indexOf(song.track_uri) > 0 ) ?
              "added-to-queue" : "" }
            ${(self.props.currentlyPlaying === song.track_uri ) ? "added-to-queue" : ""}
          `}
          onClick= {() => { _addToQueue(song); self._addEffectClass(song.track_uri)}}
        >
            <table>
                <tr className="track-title">
                    <td>{self._renderIcon(song.track_uri)}</td>
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

export default SoundcloudSongs

