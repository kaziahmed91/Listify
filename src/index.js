import React from 'react';
import ReactDOM from 'react-dom';
import App from './container/App.container.jsx';
import Auth from './components/Auth.jsx';
import { Router, Route } from 'react-enroute'



ReactDOM.render(<Router location= {window.location.pathname}>
 <Route path="/" component={App} />
 <Route path="/auth" component={Auth} />
</Router>, document.getElementById('app'))

