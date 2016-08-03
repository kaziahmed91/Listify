import React from 'react'
var FontAwesome = require('react-fontawesome');


class LoadingModal extends React.Component {

	render() {
		const scGlyph = <FontAwesome className='' name='soundcloud' size='3x' spin />
		const heart = <FontAwesome className='' name='heart' size='3x' spin />

		
		return(
			<div className="modal-container">
        <div className="modal-content">
        		{scGlyph}
					<h1> Hold tight while we grab your data!...</h1>
        	
				</div>
			</div>
		)
	}
}
export default LoadingModal