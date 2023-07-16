import { createActions, handleActions } from 'redux-actions';
import * as actionTypes from 'actionTypes';

const defaultState = {
	menuLinks: [],
	statementsTotal: 0,
	page404: false
};


export const actions = createActions ({
	[ actionTypes.SET_MENU_LINKS ]: menuLinks => ({ menuLinks }),
	[ actionTypes.SET_STATEMENTS_TOTAL ]: statementsTotal => ({ statementsTotal }),
	[ actionTypes.PAGE_404 ]: page404 => ({ page404 })
});

export default handleActions (
	{
		[ actionTypes.SET_MENU_LINKS ]: ( state, { payload } ) => ({ ...state, ...payload }),
		[ actionTypes.SET_STATEMENTS_TOTAL ]: ( state, { payload } ) => ({ ...state, ...payload }),
		[ actionTypes.PAGE_404 ]: ( state, { payload } ) => ({ ...state, ...payload }),
	},
	defaultState
);
