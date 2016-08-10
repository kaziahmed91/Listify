import React from 'react';
import SC from 'soundcloud';

import HeaderStyles from '../styles/header_container.css';
import MainStyles from '../styles/main_container.css'

import LoadingModal from "../components/LoadingModal.jsx"
import SoundcloudContainer from '../container/Soundcloud.container.jsx';
import QueueContainer from '../container/Queue.container.jsx';
import HeaderContainer from '../container/Header.container.jsx'
import CustomPlayerContainer from '../container/CustomPlayer.container.jsx';

class MainContainer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			playlists: [
				{
					name: '',
					songs: [
						{
							track_title: '',
							track_id: '',
							track_uri: '',
							track_duration: '',
							track_likes: '',
							track_playbacks: ''
						}
					]
				}
			],
			userLikedTracks:
				[{
					name: '',
					songs: [{
							tract_title: '',
							track_id: '',
							track_uri: '',
							track_duration: '',
							track_likes: '',
							track_playbacks:''
						}]
				}],
			userId: '',
			userName: '',
			userUrl: '',
			avatarUrl: '',
			playlistVisible: true,
			chosenPlaylist: '',
			partifyPlaylists: [],
			songQueue: [],
			currentlyPlaying : [],
			nextToPlay:[],
			activeTrack: 0,
			searchResults: [],
			isLoading: true,
			showQueue: true,
			UserMessage: '',
			showSearchMenu: false,
			displayMessage:false,
			displayPlayer: true
		};

		this.client_id = '01fa11d4e4bdb6fe45b244b2d5d6b49a';
		this.secret_id = '0df3a7d35e5d997bd5ed7b3e4c48d95d';
		this.redirect_uri = 'http://localhost:8080/auth';
		this._changePlaylist = this._changePlaylist.bind(this);
		this._addToQueue = this._addToQueue.bind(this);
		this._addToPlaylist = this._addToPlaylist.bind(this);
		this._changeCurrentlyPlaying = this._changeCurrentlyPlaying.bind(this);
		this._playNextSongInQueue = this._playNextSongInQueue.bind(this)
		this._searchPlaylist = this._searchPlaylist.bind(this);
		this._clearQueue = this._clearQueue.bind(this);
		this._changeActivePlaylist = this._changeActivePlaylist.bind(this);
		this._removeSongFromQueue = this._removeSongFromQueue.bind(this);
		this._changeNumberToString = this._changeNumberToString.bind(this);
		this._changeQueueDisplay = this._changeQueueDisplay.bind(this);
		this._clearSearch = this._clearSearch.bind(this);
		this._retrievePlaylist = this._retrievePlaylist.bind(this);
		this._OrderAlphabetically = this._OrderAlphabetically.bind(this);
		this._togglePlayer = this._togglePlayer.bind(this);
	}
	

	componentDidMount() {
        //initializes the SoundCloud API and allows the user to log in.
        SC.initialize( {
            client_id: this.client_id,
            client_secret: this.secret_id,
            redirect_uri: this.redirect_uri,
            oauth_token: window.localStorage.getItem('oauth_token')
        });
        this._retrievePlaylist();
    }

    _retrievePlaylist() {
        // This beast of a function connects to soundcloud and downloads all of a users playlists
        SC.connect().then(function(data) {
            window.localStorage.setItem( 'oauth_token', data.oauth_token);
            console.log(data.oauth_token)
          return SC.get('/me');
            })
          .then((me) => { 
              console.log('Hello, ' + me.username + " You are connected")
              const userName = me.username;
              const avatarUrl = me.avatar_url;
              const userId = me.id;
              const userUrl = me.permalink_url;
              this.setState({
                  userName:userName,
                  avatarUrl:avatarUrl,
                  userId:userId,
                  userURL:userUrl
              })
              return userId
          }).then((userId) => {
              SC.get("/users/" + userId + "/favorites")
              .then((liked) => {
                  let likedplaylist = {
                      name: "User Liked Tracks",
                      songs: []
                  }
                  for (let i = 0; i < liked.length; i++) {
                      likedplaylist.songs.push({
                          track_title: liked[i].title,
                          track_id: liked[i].id,
                          track_uri: liked[i].permalink_url,
                          track_duration: liked[i].duration,
                          track_likes: this._changeNumberToString(liked[i].favoritings_count),
                            track_playbacks: this._changeNumberToString(liked[i].playback_count)
                      })
                  }
                  this.setState({
                      userLikedTracks: likedplaylist
                  })
              })
              return userId
          }).then((userId) => {
              SC.get("/playlists", {
                user_id: this.state.userId,
           })
       .then((res) => {
               let playlists = [];
               var partifyPlaylists = [];
               let likedSongsPlaylist = []

               for (let i = 0; i<res.length; i++) {
                   if (res[i].permalink.substring(0,7) === "partify" ) {
                        let partifyPlaylist = { 
                            name:res[i].title.slice(19),
                            songs: []
                        }
                            let partifytrack = res[i].tracks
                        for (let y= 0; y < partifytrack.length; y++) {
                            partifyPlaylist.songs.push({
                                track_title: partifytrack[y].title,
                                    track_id: partifytrack[y].id,
                                    track_uri: partifytrack[y].permalink_url,
                                    track_duration: partifytrack[y].duration,
                                    track_likes: this._changeNumberToString(partifytrack[y].favoritings_count),
                                    track_playbacks: this._changeNumberToString(partifytrack[y].playback_count)
                            });
                        }
                            partifyPlaylists.push(partifyPlaylist);
                    }
                    if (res[i].permalink.substring(0,7) != "partify") {
                        let playlist = {
                            name: res[i].permalink,
                            songs: []
                        }
                       let track = res[i].tracks
                    for (let x= 0; x < track.length; x++) {
                        playlist.songs.push({
                            track_title: track[x].title,
                                track_id: track[x].id,
                                track_uri: track[x].permalink_url,
                                track_duration: track[x].duration,
                                track_likes: this._changeNumberToString(track[x].favoritings_count),
                                track_playbacks: this._changeNumberToString(track[x].playback_count)
                        });
                    }
                    	playlists.push(playlist);
                      playlists.sort(this._OrderAlphabetically)
                      partifyPlaylists.sort(this._OrderAlphabetically)    
                }
           }
                this.setState({
                    playlists: playlists,
                    isLoading: false,
                    partifyPlaylists: partifyPlaylists,
                    chosenPlaylist: playlists[0]
                })
       })
      })
      .catch(function(error) {
          console.log('Error! inside Connection:'+ error.message);
      })
    }


	_changePlaylist(name) {
		let PartifyPlaylist = this.state.partifyPlaylists.find((playlist) => { return (name === playlist.name) });
		let Playlist = this.state.playlists.find((playlist) => { return (name === playlist.name )});
		let chosenPlaylist = Playlist || PartifyPlaylist;		
			// console.log( "chosenplaylist" ,chosenPlaylist)	
		this.setState({chosenPlaylist});
	}			
	

	 _changeNumberToString(num) {
	    let numString = "";
        if (num < 1000) {
            return num
        } else if (num > 1000000) {
            numString = String(Math.floor(num / 1000000)) + "M" ;
        } else { 
        		numString = String(Math.floor(num / 1000)) + "K" ;
        }
      return numString;
	}

	_OrderAlphabetically(a,b) {
    // (a.name < b.name) ? -1 : 
        //a comparative function to help sort playlists alphabetically
     if (a.name < b.name) 
           return -1;
     if (a.name > b.name)
           return 1;
             return 0;
    }
		
  _findSongObjectById(id){ 
  	this.state.playlists.songs.find((songObj) => { if (id === songObj.id)  {return songObj} })
  }

  _togglePlayer() {
    this.state.displayPlayer ? this.setState({displayPlayer: false }) : this.setState({displayPlayer: true })
  }

 _addEffectToSong(index) { 
    let selectedTrack = this.state.chosenPlaylist
  }

  _addToQueue(songObj) { 
  	var currentQ = this.state.songQueue;
  	var currentUriList = this.state.nextToPlay;

  	let songInQ = currentQ.find((queueItem) => {
  		return queueItem.track_id === songObj.track_id
  	})

  	if (currentQ.length == 0) {
  		this.setState({
  			currentlyPlaying: songObj.track_uri
  		})
  	} 

  	if (songInQ) { 
  		alert("Song already Exists!");
  	} else  {  
  		currentQ.push(songObj)	
  		currentUriList.push(songObj.track_uri)
  		this.setState({
  			songQueue: currentQ ,
  			nextToPlay: currentUriList
  		})
  	}
  	console.log("Songs next in line to play: ", this.state.nextToPlay)
  	console.log("First in Q and currently playing: ", this.state.currentlyPlaying )
  }

    _addToPlaylist(queue, name) { 
  	let songQueue = this.state.songQueue;
  	let findSongsinQ = (songQueue.length > 0) 

  	let songToAdd = [ ];

  	if (findSongsinQ) {
  		for (var i=0; i < songQueue.length; i++) { 
  			 songToAdd.push({id: songQueue[i].track_id})
  		}  			
  	} 	
  	SC.post('/playlists', {
    	playlist: { title: 'Partify Playlist : '+ name , tracks: songToAdd }
  	});

  	this.setState({
  		UserMessage: "Playlist has+ been added!",
  		Loadmessage: true,
  		songQueue: []
  	})

  	

  	this._retrievePlaylist();
  	console.log("Queue provided by Button Click" , queue)
  }

  _searchPlaylist(searchText) {
  	let playlists = this.state.playlists.concat(this.state.partifyPlaylists)
  	let searchterm = searchText
  	let searchResults = []
  	let songsearchResults = []

  	for (let i = 0; i < playlists.length; i++) {
  		songsearchResults[i] = [];
  		songsearchResults[i].push(playlists[i].name)
  		playlists[i].songs.forEach((song) => { 
  			if (song.track_title.match(searchterm)) {
  				songsearchResults[i].push(song)
  			}
  		})
  		console.log("song search results" ,songsearchResults)
  	}	
  	
  	this.setState({
  		searchResults: songsearchResults,
  		showSearchMenu: true
  	})
  }



  _clearSearch() {
     this.setState({
         showSearchMenu: false
     })
 }
  _clearQueue() {
  	 console.log(this.songQueue , this.nextToPlay)
  	this.setState({
  		songQueue: [],
  		nextToPlay: []
  	})

  }

  _changeCurrentlyPlaying(index) { 
        let playerQueue = this.state.nextToPlay;
        let selectedTrack = this.state.songQueue[index].track_uri
        let playerTrackIndex = playerQueue.indexOf(selectedTrack)
        let Tracks = playerQueue.splice(0, playerTrackIndex)

        if(selectedTrack === this.state.currentlyPlaying){
            this.setState({
                displayMessage: true,
       UserMessage: "Song already playing!"
            })
            return

        } else {
            playerQueue = playerQueue.concat(Tracks);

            this.setState({
                currentlyPlaying: selectedTrack,
                nextToPlay: playerQueue,
            })
        }
    }

	_playNextSongInQueue() { 
		// check to see if songInQueue container is empty. 
		// if not empty get the 2nd item in queue and pop the first one off. 
		// set state to the 2nd item. 
		let playerQueue = this.state.nextToPlay;
		if (playerQueue.length > 1 ) { 
		  	playerQueue.push(playerQueue.shift())
		  this.setState({
		  	nextToPlay: playerQueue,
		  	currentlyPlaying: playerQueue[0]
		  })
		}
		console.log("AfterSongFinishes, NextSongQueue:", playerQueue);
	};
_removeSongFromQueue(index) { 
        //Removes a song from the current running queue and also removes it's from the list of URIs
       let playerQueue = this.state.nextToPlay;
       let selectedTrack = this.state.songQueue[index].track_uri;
       let playerTrackIndex = playerQueue.indexOf(selectedTrack)
       let currentQueue = this.state.songQueue;

       if (!(this.state.currentlyPlaying === selectedTrack))  { 
               playerQueue.splice(playerTrackIndex, 1)
           currentQueue.splice(index, 1);
           this.setState({
               displayMessage: true,
               UserMessage: "Song Removed!",
               songQueue: currentQueue,
               nextToPlay: playerQueue
           })
       } else { 
           this.setState({
               displayMessage: true,
               UserMessage: "Song Cant be cremoved!"
           })
       }
       console.log("Player Queue updated:",  playerQueue)
 }

	_changeActivePlaylist() { this.setState({ chosenPlaylist : '' }) }
	_changeQueueDisplay() { this.setState({showQueue : !this.state.showQueue }) }

	render() {
		// console.log("UserLikedTracks:",  this.state.userLikedTracks.songs)
		console.log("state of queuedisplay:",this.state.showQueue)
    console.log("state of playerDisplay:",this.state.displayPlayer)
		if (this.state.isLoading == true) {
        return (
          <LoadingModal/>
        );
    } else {
  		return (
  			<div>
  					<HeaderContainer
  						{...this.state}
  						_searchPlaylist={this._searchPlaylist}
  						searchText={this.props.searchText}
              _changeQueueDisplay={this._changeQueueDisplay}
              
  					/>

  				<div className="controller-body">	 
  					<SoundcloudContainer
  					  {...this.state}
              nextToPlay= {this.state.nextToPlay}
  						_changePlaylist ={this._changePlaylist}
  						_addToQueue={this._addToQueue}	
  						userId={this.state.userId}
  						playlistVisible={this.state.playlistVisible}
  						isLoading={this.state.isLoading}
  						_changeActivePlaylist={this._changeActivePlaylist}
              _clearSearch={this._clearSearch}
  					/>

  				{this.state.showQueue ? 
  					<QueueContainer
              {...this.state}
  						songQueue={this.state.songQueue}
  						_addToPlaylist={this._addToPlaylist}
  						_changeCurrentlyPlaying= {this._changeCurrentlyPlaying}
  						_clearQueue={this._clearQueue}
  						_removeSongFromQueue = {this._removeSongFromQueue}
              _togglePlayer= {this._togglePlayer}
  					/> : null  }
  				</div>

  			<div className={this.state.displayPlayer}>
  				{this.state.currentlyPlaying && this.state.currentlyPlaying.length > 0 ? 
  					<CustomPlayerContainer
  					{...this.state}
  						currentlyPlaying = {this.state.currentlyPlaying}
  						_playNextSongInQueue = {this._playNextSongInQueue}
  						_clearqueue={this._clearqueue}
  					/> : null}
  				</div>
  			</div>
  		)
	  } 
	}
}


export default MainContainer