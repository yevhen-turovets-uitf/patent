import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from 'sagas/index';
import rootReducer from 'reducers/index';

const dev = process.env.NODE_ENV === 'development',
	sagaMonitor = dev ? console.tron.createSagaMonitor() : null,
	sagaMiddleware = createSagaMiddleware ({ sagaMonitor }),
	reducer = combineReducers ( rootReducer ),
	enhancer = !dev ? applyMiddleware ( sagaMiddleware ) :
		compose (
			applyMiddleware ( sagaMiddleware ),
			console.tron.createEnhancer()
		),
	configStore = ( initialState = {} ) => {
		const store = createStore (
			reducer,
			initialState,
			enhancer
		);

		sagaMiddleware.run ( rootSaga );

		if ( module.hot )
		{
			module.hot.accept ( 'reducers', () => {
				store.replaceReducer ( require ( 'reducers/index' ).default );
			} );
		}

		return store;
	};


export default configStore();
