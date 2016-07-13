import React from 'react'
import style from '../styles/playlist.css'
import $ from 'jquery'


class Playlist extends React.Component { 
	constructor(props) { 
		super(props)
		this.state= { 
			collapsed: true 
		}
		this.toggle = this.toggle.bind(this);
	}


	toggle(e) {	
		// this.setState({collapsed: !this.state.collapsed})
		this.$panel.toggleClass('collapsed')
	}

	toggleClass() {
		return `panel panel-default ${ this.state.collapsed ? 'collapsed' : '' }`  
	}

	componentDidMount() {
		this.$panel = $(this.refs.panel)
	}

	render() { 
		return (
			<span>
			<div className="panel-group">
				<div className="panel panel-default collapsed" ref="panel">
					<div className="panel-heading collapsed" ref="panel" onClick={this.toggle}>

	      		<h4 className="panel-title">
	        		<a className="accordion-toggle" >
	         			{this.props.playlist.name}
	        		</a>
	     			</h4>

	   			</div>
	   			<div id="" className="panel-collapse collapse in">
	   				<div className="collapsed-content">
	      			<div className="panel-body">
	      				{this.props.playlist.songs.map(function(song, index) { 
									return ( 
										<div key={index}>
											<a href={song.track_uri}>{song.track_title}</a>
										</div>
									)
								})}
	      			</div>
	      		</div>
    			</div>
				</div>
			</div>
		</span>
		)
	}
}

export default Playlist
