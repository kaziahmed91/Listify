import React from 'react';

class Auth extends React.Component { 
	render() { 
		return(
			<div>
				 <title>Connect With Soundcloud</title>
				 <body onload ={window.setTimeout(window.opener.SC.connectCallback, 1)}>
				 	<b>This popup should automatically close in a few seconds</b>
				 </body>
			</div>
		)
	}
}

export default Auth

				