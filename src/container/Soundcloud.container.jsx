import React from 'react';
import SoundcloudStyles from '../styles/soundcloud_container.css';
import PlaylistsStyle from '../styles/playlists_n_tracks_container.css';
var FontAwesome = require('react-fontawesome');
import Animatefrom from '../styles/animate.css'
import PlaylistButtons from '../components/PlaylistButtons.jsx';
// import PlaylistSongs from '../components/PlaylistSongs.jsx';
import SoundcloudSongs from '../components/SoundcloudSongs.jsx';
import PartifySongs from '../components/PartifySongs.jsx';
import UserLikedTracks from '../components/UserLikedTracks.jsx';
import SearchContainer from '../container/Search.container.jsx'

import LoadingModal from "../components/LoadingModal.jsx"
// import UserLikedTracks from "../components/UserLikedTracks.jsx"
import Divider from 'muicss/lib/react/divider';
import Tab from 'muicss/lib/react/tab';
import Tabs from 'react-simpletabs';

import MessageContainer from '../container/Message.container.jsx';
import SearchStyles from '../styles/search_container.css'
import Results from '../components/Results.jsx';


class SoundcloudContainer extends React.Component {

  _passToQueue(song) {
    this.props._addToQueue(song);
  }  
  _updateFirstPlaylist($selectedPanel) {
   if ($selectedPanel === 1) {
     this.props._changePlaylist(this.props.playlists[0].name)
   } else if ($selectedPanel === 2) {
     this.props._changePlaylist(this.props.partifyPlaylists[0].name)
   }
 }
  render() {

    const glyphState = (this.props.displayPlayer === "") ? 
      <FontAwesome className='queue-glyph' name='minus' size='3x' onClick={this.props._hidePlayer} />
    : <FontAwesome className='queue-glyph' name='plus' size='3x' onClick={this.props._hidePlayer} />

    const PlaylistButtonList = this.props.playlists.length > 1
      ?    this.props.playlists.map((playlist, index) =>
            <PlaylistButtons playlistName={playlist.name} _changePlaylist={this.props._changePlaylist} key={index} />
          )
    : null

    const PartifyPlaylistButtonList = this.props.partifyPlaylists.length > 1
      ?    this.props.partifyPlaylists.map((playlist, index) =>
            <PlaylistButtons playlistName={playlist.name} _changePlaylist={this.props._changePlaylist} key={index} />
        )            
    : null

    const QueueGlyph = <FontAwesome className='queue-glyph' name='bars' size='3x' onClick={this.props._changeQueueDisplay} />
    const HidePlayerGlyph = <FontAwesome className='queue-glyph' name='minus' size='3x' onClick={this.props._hidePlayer} />
    const searchOrList = this.props.showSearchMenu ? 
      <div className="search-results animated slideInDown">
        <Results 
          showSearchMenu={this.props.showSearchMenu} 
          searchResults={this.props.searchResults}
          _addToQueue={this._passToQueue.bind(this)}
          _clearSearch={this.props._clearSearch}
        /> 
      </div>
      :
        <Tabs
        onAfterChange={this._updateFirstPlaylist.bind(this)}
        tabActive={1}
        >

        <Tabs.Panel title="Soundcloud" className="">
          <h3 className="tab-header"> :Selections in {this.props.chosenPlaylist.name}</h3>
            <div className="ui-container">
            <div className="playlists-container">
              {PlaylistButtonList}
            </div>
            <div className="tracks-container">
              <SoundcloudSongs 
                chosenPlaylist={this.props.chosenPlaylist}
                _addToQueue={this._passToQueue.bind(this)}
                nextToPlay= {this.props.nextToPlay}
                currentlyPlaying = {this.props.currentlyPlaying}
              />
            </div>
          </div>
        </Tabs.Panel>

        <Tabs.Panel title='Listify' className="">
            <h3 className="tab-header"> :Selections in {this.props.chosenPlaylist.name}</h3>
          <div className="ui-container">
            <div className="playlists-container">
                {PartifyPlaylistButtonList}
            </div>
            <div className="tracks-container">
              <PartifySongs 
                chosenPlaylist={this.props.chosenPlaylist}
                _addToQueue={this._passToQueue.bind(this)}
              />
            </div>
          </div>
        </Tabs.Panel>

        <Tabs.Panel title='Likes'>
            <div className="likes-container">
              <div className="likes-content">
              <h3 className="playlist-title">User Liked Tunes</h3>
              <UserLikedTracks 
                userLikedTracks = {this.props.userLikedTracks}
               _addToQueue = {this._passToQueue.bind(this)}
              />
              </div>
            </div>
        </Tabs.Panel>
      </Tabs>

  return (
    <div className="soundcloud-container">
      {searchOrList}
        <br/><br/><br/><br/><br/><br/>
    </div>
    )
      
  }
}

export default SoundcloudContainer



