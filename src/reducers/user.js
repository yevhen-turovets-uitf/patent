import { createActions, handleActions } from 'redux-actions';
import * as actionTypes from 'actionTypes';

const defaultState = {
	init: false
};


export const actions = createActions ({
	[ actionTypes.SET_USER ]: data => data,
	[ actionTypes.MERGE_USER ]: data => data
});

export default handleActions (
	{
		[ actionTypes.SET_USER ]: ( state, { payload } ) => payload,
		[ actionTypes.MERGE_USER ]: ( state, { payload } ) => ({ ...state, ...payload })
	},
	defaultState
);
