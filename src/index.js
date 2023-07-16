import 'reactotron';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from 'reduxStore';
import * as serviceWorker from './serviceWorker';
import theme from 'theme';

if ( process.env.NODE_ENV === 'development' ) console.log ( theme );


const render = Component => ReactDOM.render (
		<Provider {...{ store }}>
			<Component />
		</Provider>,
	document.getElementById ( 'page' )
);

render ( App );

if ( module.hot )
{
	module.hot.accept (
		'./App',
		() => render (
			require ( './App' ).default // Next App
		)
	);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
