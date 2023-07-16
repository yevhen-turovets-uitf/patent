import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';
import apisaucePlugin from 'reactotron-apisauce';


if ( process.env.NODE_ENV === 'development' )
{
	const tron = Reactotron.configure()
		.use ( reactotronRedux() )
		.use ( sagaPlugin() )
		.use ( apisaucePlugin() )
		.connect();

	tron.clear();

	console.tron = tron;
}
