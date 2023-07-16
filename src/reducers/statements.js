import { createActions, handleActions } from 'redux-actions';
import * as actionTypes from 'actionTypes';

const defaultState = {
	lists: [],
	index: 0,
	search: '',
	searchBar: false,
	waiter: false
};


export const actions = createActions ({
	[ actionTypes.STATEMENTS_REQUEST ]: ( params, isFiltered, index ) => ({ params, isFiltered, index }),
	[ actionTypes.STATEMENTS ]: ( list, index ) => ({ list, index }),
	[ actionTypes.STATEMENTS_SET_INDEX ]: index => ({ index }),
	[ actionTypes.STATEMENTS_SEARCH_BAR ]: searchBar => ({ searchBar }),
	[ actionTypes.STATEMENTS_SEARCH ]: search => ({ search }),
	[ actionTypes.REMOVE_STATEMENT_REQUEST ]: ( id, callback ) => ({ id, callback }),
	[ actionTypes.REMOVE_STATEMENT ]: ( id, error ) => ({ id, error }),
	[ actionTypes.COPY_STATEMENT_REQUEST ]: id => ({ id }),
	[ actionTypes.COPY_STATEMENT ]: null
});

export default handleActions (
	{
		[ actionTypes.STATEMENTS ]: statementsReducer,
		[ actionTypes.STATEMENTS_SET_INDEX ]: ( state, { payload } ) => ({ ...state, ...payload }),
		[ actionTypes.STATEMENTS_SEARCH_BAR ]: ( state, { payload } ) => ({ ...state, ...payload }),
		[ actionTypes.STATEMENTS_SEARCH ]: ( state, { payload } ) => ({ ...state, ...payload }),
		[ actionTypes.REMOVE_STATEMENT_REQUEST ]: state => ({ ...state, waiter: true }),
		[ actionTypes.REMOVE_STATEMENT ]: state => ({ ...state, waiter: false }),
		[ actionTypes.COPY_STATEMENT_REQUEST ]: state => ({ ...state, waiter: true }),
		[ actionTypes.COPY_STATEMENT ]: state => ({ ...state, waiter: false })
	},
	defaultState
);


function statementsReducer ( state, { payload: { index, list } } )
{
	const lists = state.lists.slice();

	lists[ index ] = list;

	return { ...state, lists };
}
