import React from 'react';
import QueueStyles from '../styles/queue_container.css';
var FontAwesome = require('react-fontawesome');

class QueueContainer extends React.Component {
		constructor() {
		super();
		this.state = {
			allowpopup: false,
			playlistName: ''
		}
	}

	_callpopup(){
		this.setState({
			allowpopup: true
		})
	}

	_cancelpopup() {
		this.setState({
			allowpopup: false
		})
	}

	_updateplaylistName(e) {
		this.setState({playlistName: e.target.value})
	}

	_addtoplaylists() {
		this.props._addToPlaylist(this.props.songQueue, this.state.playlistName)
		this.setState({allowpopup: false})
	}

	render() {
		const playGlyph = <FontAwesome className='gPlay' name='play-circle-o' size='2x' />
		const trashGlyph = <FontAwesome onClick={this.props._clearQueue} className='gTrash' name='trash-o' size='3x' />
		const saveGlyph = <FontAwesome onClick={this._callpopup.bind(this)} className='gSave' name='floppy-o' size='3x' />
		const closeGlyph = <FontAwesome className='gClose' name='times-circle-o' size='2x' />
		const QueueGlyph = <FontAwesome className='queue-glyph dropbtn dropdown' name='bars' size='3x'  />
		const glyphState = this.props.displayPlayer ? 
      <FontAwesome className='queue-glyph dropdown' name='minus' size='3x' onClick={this.props._togglePlayer} />
    : <FontAwesome className='queue-glyph dropdown' name='plus' size='3x' onClick={this.props._togglePlayer} />

		const queueTracks = this.props.songQueue.map( (song, index) => {
			return (
				<div key={index} className="queue-track-container"  >							
					<table>	
						<tr className="queue-track-title">
							<td>
							{(this.props.currentlyPlaying === song.track_uri) ? 
							<FontAwesome className='' name='pause-circle-o' size='2x' />
							: <FontAwesome className='' name='play-circle-o' size='2x' />}
							</td>
							<td onClick={ () => {this.props._changeCurrentlyPlaying(index) } }>{song.track_title}</td>
							<td id="" onClick={ () => this.props._removeSongFromQueue(index) }>{closeGlyph}</td>
						</tr>		
					</table>			
				</div>
			)
		})

		if (this.state.allowpopup) {
			return(
				<div className="modal-container">
						
					<div className="modal-content">
						 <div className="close-modal">
								<FontAwesome onClick={this._cancelpopup.bind(this)} name='times-circle-o' size='2x' />
							</div>
						 <h3>What's Your Playlist Called?</h3>
						 
							  <fieldset className="form-group">
							    <input type="text" className="form-control playlist-name-input" id="formGroupExampleInput2" placeholder="Playlist Name" value={this.state._playlistName} onChange={this._updateplaylistName.bind(this)}/>
							  	<button className="playlist-submit btn btn-submit"onClick={this._addtoplaylists.bind(this)}> Submit </button>
									<button className="playlist-cancel btn" onClick={this._cancelpopup.bind(this)}> Cancel </button>
							  </fieldset>
					</div>
				</div>
			)
	} else { 
			return (
				<div className="nav-buttons" >
					<div className="dropdown">
							{QueueGlyph}
							<div className="dropdown-content">
								{queueTracks}
								<div className="queue-glyphs">
									{saveGlyph}
									{trashGlyph}
							</div>
						</div>
					</div>
					<div className="dropdown">
						{glyphState}
						<div>
								<div className="queue-glyphs">
							</div>
					</div>
					</div>
				</div>
			)
		} 
	}
}





export default QueueContainer

