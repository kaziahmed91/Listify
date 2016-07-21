import React from 'react';
import HeaderStyles from '../styles/header_container.css';
var FontAwesome = require('react-fontawesome');

class HeaderContainer extends React.Component { 
	constructor(props) {
		super(props)
		this.state = {filterText: ""}
	}

	_updateSearchText(e) {
		this.setState({filterText: e.target.value})
	}

	handleSearch(e) {
		e.preventDefault();
		this.props._searchPlaylist(this.state.filterText)
	}

	render() { 
		

		return(
			<div className="header-container">
				<div className="header-inside">
					<div className="header-title">
						<img className="logo" src="https://s3.amazonaws.com/assets.thefreelogomakers.com/generators/free-logo-maker/images/tflm.co.9656SPHWM.png" />        
                 
					</div>
					<form className="form-inline" onSubmit={this.handleSearch.bind(this)}>
         		<div className="form-group search-bar">
              <input id="input-bar" 
              type="text" 
              value={this.state.filtertext}  
              onChange={this._updateSearchText.bind(this)} 
              placeholder="Search" 
              />
            </div>
         </form>
         		<div className="user-info">
							<p>Hello {this.props.userName} </p>
						</div>
				</div>
			</div>	
		)
	}
}

export default HeaderContainer