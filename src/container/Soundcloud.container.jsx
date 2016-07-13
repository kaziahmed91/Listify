import React from 'react';
import SC from 'soundcloud';
import Playlist from '../components/Playlist.jsx';

class SoundcloudContainer extends React.Component {

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
		}
		this.client_id = '01fa11d4e4bdb6fe45b244b2d5d6b49a';
		// 01fa11d4e4bdb6fe45b244b2d5d6b49a
		this.secret_id = '0df3a7d35e5d997bd5ed7b3e4c48d95d';
		this.redirect_uri = 'http://localhost:8080/auth';
		this.retrievePlaylist = this.retrievePlaylist.bind(this);

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
	  			console.log('Hello, ' + me.username)
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
	  				console.log(this.state.userId);
	  		}).catch(function(error) {
	  			console.log('Error!:'+ error.message);
	  		})
		};

	retrievePlaylist() {
		let self = this
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
	    		self.setState({
	    			playlists: playlists
	    		})
    	})
    	.catch(function(error) {
	  			console.log('Error!:'+ error.message);
	  	})
  }


	render() {
		// console.log("Playlist 0 name:", this.state.playlists[0].name)
	  // console.log(" State Playlists:", this.state.playlists)
	  // console.log(" State Playlist name 1:", this.state.playlists[0].name)
		
		return (

			<div>
			<h1>List of Playlists:</h1>
			<button className="btn btn-submit" onClick={this.retrievePlaylist}> Show Me the MONEY </button>
				<ul>
					{this.state.playlists.map(function(playlist, index) { 
						return (
							<div key={index}>
									<Playlist playlist={playlist} />
							</div>
						)
					})}
				</ul>
			</div>
		)

	}
}

export default SoundcloudContainer
