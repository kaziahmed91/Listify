import React from 'react';
import MainContainer from '../container/Main.container.jsx'
import HeaderStyles from '../styles/header_container.css';


class HeaderContainer extends React.Component { 

	render() { 

		return(
			<div className="header-container">
				<h1> Partify </h1>
				<p>Hello {this.props.userName} </p>
				<button className="btn btn-submit <pull-right></pull-right>" onClick={this.props._retrievePlaylist}> Show Me the MONEY </button>
			</div>
		)
	}

}



export default HeaderContainer