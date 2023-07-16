import { createActions, handleActions } from 'redux-actions';
import * as actionTypes from 'actionTypes';

const defaultState = {
	stack: []
};


export const actions = createActions ({
	[ actionTypes.HISTORY ]: ( name, ...args ) => ({ name, args })
});

export default handleActions (
	{
		[ actionTypes.HISTORY ]: ( state, { payload: { name, args } } ) => ({
			...state,
			stack: [ { name, args } ].concat ( state.stack ).slice ( 0, 10 )
		})
	},
	defaultState
);
