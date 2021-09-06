import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';

// Paginas
	import App from './pages/app';
	import Login from './pages/login';
	import Recovery from './pages/recovery';

ReactDOM.render(
	<BrowserRouter>

		<Route exact path="/" component={Login}></Route>
		<Route path="/app/:action?/:method?/:id?" component={App}></Route>

		<Route path="/login" component={Login}></Route>
		<Route path="/recovery" component={Recovery}></Route>

	</BrowserRouter>,
	document.getElementById('root')
);