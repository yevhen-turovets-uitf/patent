import { createActions, handleActions } from 'redux-actions';
import * as actionTypes from 'actionTypes';
import {
	setOpenDataLocalState,
	removeOpenDataLocalState,
	getOpenDataLocalState
} from 'functions';

const defaultState = {
	mktuClassSelectOptions: undefined,
	mktuSearchForm: {
		product_class: '',
		product_number: '',
		product_name: ''
	},
	mktuSearch: {
		products: undefined,
		class_filter_list: undefined,
		active_class_filter: undefined,
		current_page: undefined,
		page_count: undefined,
		product_count: undefined
	},
	mktuClassList: {
		classes: undefined,
		current_page: undefined,
		page_count: undefined
	},
	mktuClassDetailed: {
		description_list: undefined,
		products: undefined,
		current_page: undefined,
		page_count: undefined
	},
	mktuVersion: undefined,
  mktuViennese: undefined,
  mktuIdentifier: undefined,
	waiter: undefined,
	...getOpenDataLocalState('mktuSearch')
};

export const actions = createActions ({
	[ actionTypes.MKTU_SELECT_OPTIONS_REQUEST ]: () => ({ waiter: true }),
	[ actionTypes.MKTU_SELECT_OPTIONS ]: ( result, error ) => ({ result, error }),
	[ actionTypes.MKTU_SEARCH_REQUEST ]: ( params ) => ({ params, waiter: true }),
	[ actionTypes.MKTU_SEARCH ]: ( result, error ) => ({ result, error }),
	[ actionTypes.MKTU_CHANGE_SEARCH_FORM ]: ( value ) => ({ value }),
	[ actionTypes.MKTU_CLEAR_SEARCH_FORM ]: () => null,
	[ actionTypes.MKTU_CLASS_LIST_REQUEST ]: ( current_page ) => ({ current_page, waiter: true }),
	[ actionTypes.MKTU_CLASS_LIST ]: ( result, error ) => ({ result, error }),
	[ actionTypes.MKTU_CLASS_DETAILED_REQUEST ]: ( classNumber, current_page ) => ({ classNumber, current_page, waiter: true }),
	[ actionTypes.MKTU_CLASS_DETAILED ]: ( result, error ) => ({ result, error }),
	[ actionTypes.MKTU_CLEAR_CLASS_DETAILED ]: () => null,
	[ actionTypes.MKTU_VERSION_REQUEST ]: () => ({ waiter: true }),
	[ actionTypes.MKTU_VERSION ]: ( result, error ) => ({ result, error }),
	[ actionTypes.MKTU_VIENNESE_REQUEST ]: () => ({ waiter: true }),
	[ actionTypes.MKTU_VIENNESE ]: ( result, error ) => ({ result, error }),
	[ actionTypes.MKTU_IDENTIFIER_REQUEST ]: () => ({ waiter: true }),
	[ actionTypes.MKTU_IDENTIFIER ]: ( result, error ) => ({ result, error })
});

export default handleActions (
	{
		[ actionTypes.MKTU_SELECT_OPTIONS_REQUEST ]: ( state, { payload: { waiter } } ) => ({
			...state,
			waiter
		}),
		[ actionTypes.MKTU_SELECT_OPTIONS ]: ( state, { payload: { result, error } } ) => (
			error
			? {
				...state,
				waiter: false
			}
			: { 
				...state,
				mktuClassSelectOptions: result,
				waiter: false
			}
		),
		[ actionTypes.MKTU_SEARCH_REQUEST ]: ( state, { payload: { waiter } } ) => ({
			...state,
			waiter
		}),
		[ actionTypes.MKTU_SEARCH ]: mktuSearchReducer,
		[ actionTypes.MKTU_CHANGE_SEARCH_FORM ]: ( state, { payload: { value } } ) => ({
			...state,
      mktuSearchForm: {
        ...state.mktuSearchForm,
        ...value
      }
    }),
		[ actionTypes.MKTU_CLEAR_SEARCH_FORM ]: mktuClearSearchFormReducer,
		[ actionTypes.MKTU_CLASS_LIST_REQUEST ]: ( state, { payload: { waiter } } ) => ({
			...state,
			waiter
		}),
		[ actionTypes.MKTU_CLASS_LIST ]: ( state, { payload: { result, error } } ) => (
			error
			? {
				...state,
				waiter: false
			}
			: {
				...state,
				mktuClassList: { ...result },
				waiter: false
			}
		),
		[ actionTypes.MKTU_CLASS_DETAILED_REQUEST ]: ( state, { payload: { waiter } } ) => ({
			...state,
			waiter
		}),
		[ actionTypes.MKTU_CLASS_DETAILED ]: ( state, { payload: { result, error } } ) => (
			error
			? {
				...state,
				waiter: false
			}
			: {
				...state,
				mktuClassDetailed: { ...result },
				waiter: false
			}
		),
		[ actionTypes.MKTU_CLEAR_CLASS_DETAILED ]: ( state ) => ({
			...state,
			mktuClassDetailed: {
				description_list: undefined,
				products: undefined,
				current_page: undefined,
				page_count: undefined
			}
		}),
		[ actionTypes.MKTU_VERSION_REQUEST ]: ( state, { payload: { waiter } } ) => ({
			...state,
			waiter
		}),
		[ actionTypes.MKTU_VERSION ]: ( state, { payload: { result, error } } ) => (
			error
			? {
				...state,
				waiter: false
			}
			: {
				...state,
				mktuVersion: [ ...result.items ],
				waiter: false
			}
		),
		[ actionTypes.MKTU_VIENNESE_REQUEST ]: ( state, { payload: { waiter } } ) => ({
			...state,
			waiter
		}),
		[ actionTypes.MKTU_VIENNESE ]: ( state, { payload: { result, error } } ) => (
			error
			? {
				...state,
				waiter: false
			}
			: {
				...state,
				mktuViennese: [ ...result.files ],
				waiter: false
			}
		),
		[ actionTypes.MKTU_IDENTIFIER_REQUEST ]: ( state, { payload: { waiter } } ) => ({
			...state,
			waiter
		}),
		[ actionTypes.MKTU_IDENTIFIER ]: ( state, { payload: { result, error } } ) => (
			error
			? {
				...state,
				waiter: false
			}
			: {
				...state,
				mktuIdentifier: [ ...result.items ],
				waiter: false
			}
		),
	},
	defaultState
);

function mktuSearchReducer ( state, { payload: { result, error } } ) {
	if (!!error) {
		return {
			...state,
			waiter: false
		}
	}

	setOpenDataLocalState('mktuSearch', {
		mktuSearchForm: state.mktuSearchForm,
		mktuSearch: {
			...state.mktuSearch,
			...result
		}
	})

	return {
		...state,
		mktuSearch: {
			...state.mktuSearch,
			...result
		},
		waiter: false
	}
}

function mktuClearSearchFormReducer ( state ) {
	removeOpenDataLocalState('mktuSearch');

	return {
		...state,
		mktuSearchForm: {
			product_class: '',
			product_number: '',
			product_name: ''
		},
		mktuSearch: {
			products: undefined,
			class_filter_list: undefined,
			active_class_filter: undefined,
			current_page: undefined,
			page_count: undefined,
			product_count: undefined
		}
	}
}