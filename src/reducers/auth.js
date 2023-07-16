import { createActions, handleActions } from 'redux-actions';
import * as actionTypes from 'actionTypes';

const defaultState = false;

export const actions = createActions ({
	[ actionTypes.LOGIN ]: null,
	[ actionTypes.LOGOUT ]: null
});

export default handleActions (
	{
		[ actionTypes.LOGIN ]: () => true,
		[ actionTypes.LOGOUT ]: () => false
	},
	defaultState
);
