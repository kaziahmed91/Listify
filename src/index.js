import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import Auth from './components/Auth.jsx';
import { Router, Route } from 'react-enroute'
import SoundcloudContainer from './container/Soundcloud.container.jsx'
import ServicesContainer from './container/Services.container.jsx'



ReactDOM.render(<Router location= {window.location.pathname}>
 <Route path="/" component={SoundcloudContainer} />
 <Route path="/auth" component={Auth} />
</Router>, document.getElementById('app'))

