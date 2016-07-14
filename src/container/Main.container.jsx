import React from 'react';
import SC from 'soundcloud';
import PlaylistButton from '../components/PlaylistButton.jsx';
import PlaylistItem from '../components/PlaylistItem.jsx';
import PlaylistsStyles from '../styles/playlists_container.css';
import HeaderStyles from '../styles/header_container.css';
import SoundcloudContainer from '../container/Soundcloud.container.jsx';
import QueueContainer from '../container/Queue.container.jsx';
import HeaderContainer from '../container/Header.container.jsx'


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
							track_duration: ''
						}
					]
				}
			],
			userId: '',
			userName: '',
			userUrl: '',
			avatarUrl: '',
			playlistVisible: false,
			chosenPlaylist: '',
			songQueue: []
		}

		this.client_id = '01fa11d4e4bdb6fe45b244b2d5d6b49a';
			
		this.secret_id = '0df3a7d35e5d997bd5ed7b3e4c48d95d';
		this.redirect_uri = 'http://localhost:8080/auth';
		this._retrievePlaylist = this._retrievePlaylist.bind(this);
		this._changePlaylist = this._changePlaylist.bind(this);
		this._addToQueue = this._addToQueue.bind(this);

	}

	componentDidMount() {
		SC.initialize( {
			client_id: this.client_id,
			client_secret: this.secret_id,
			redirect_uri: this.redirect_uri,
			oauth_token: window.localStorage.getItem('oauth_token')

		});

		SC.connect().then(function(data) {
			window.localStorage.setItem =( 'oauth_token', data.oauth_token);
			console.log(data.oauth_token)
	  	return SC.get('/me');
			}).then((me) => { 
	  			console.log('Hello, ' + me.username + " You are connected")
	  			const userName = me.username;
	  			const avatarUrl = me.avatar_url;
	  			const userId = me.id;
	  			const userUrl = me.permalink_url;
	  			this.setState({
	  				userName:this.state.userName.concat([userName]),
	  				avatarUrl:this.state.avatarUrl.concat([avatarUrl]),
	  				userId:this.state.userId.concat([userId]),
	  				userURL:this.state.userUrl.concat([userUrl])
	  			})
	  		}).catch(function(error) {
	  			console.log('Error! inside Connection:'+ error.message);
	  		})
	}

	_changePlaylist(name) {
		console.log('Playlist', name);
		// console.log('In click function'); 
		let chosenPlaylist = this.state.playlists.find((playlist) => name === playlist.name);
		this.setState({chosenPlaylist});
		}

	_retrievePlaylist() {
    SC.get("/playlists", {
    		 	user_id: this.state.userId,
    		})
    	.then((res) => {
    			let playlists = [];
    			// debugger;
    			for (let i = 0; i<res.length; i++) {
    				let playlist = {
    					name: res[i].permalink,
    					songs: []
    				}
    				let track = res[i].tracks
	    			for (let x= 0; x < track.length; x++) {
	    				playlist.songs.push({
	    					track_title: track[x].title,
								track_id: track[x].id,
								track_uri: track[x].uri,
								track_duration: track[x].duration
	    				});
	    			}
	    			playlists.push(playlist);
    			}
	    		this.setState({
	    			playlists: playlists
	    		})
    	})
    	.catch(function(error) {
	  			console.log('Error! in retrieving Playlist:'+ error.message);
	  	})
  }

  _addToQueue(song) { 
  	songToAdd = song;
  	let songInQ = this.state.songQueue.find((queueItem) => {
  		return queueItem.track_title === song.track_title
  	})
  	if (songInQ) { 
  		alert("Song already Exists!");
  	} else  {  
  		this.setState({songQueue: songToAdd})
  	}
  	console.log(this.state.songQueue)
  }


	render() {
		
		return (

			<div>
				<HeaderContainer
					{...this.state}
						_retrievePlaylist={this._retrievePlaylist}
				 />
				<SoundcloudContainer
				  {...this.state}
					_changePlaylist ={this._changePlaylist}
					_addToQueue={this._addToQueue}	/>
				<QueueContainer
					{...this.state} 
					_addToQueue={this._addToQueue}
				/>
			</div>
		)

	}
}


export default MainContainer

