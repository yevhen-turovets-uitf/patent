import { createActions, handleActions } from 'redux-actions';
import * as actionTypes from 'actionTypes';

const defaultState = {
	mainForm: {
    group: '',
    objectType: 'all',
    documentType: 'all',
    registrationPeriod: {
      start: null,
      end: null
    },
    publicationPeriod: {
      start: null,
      end: null
    },
    status: 'all',
    categoryIndex: ''
  }
};

export const actions = createActions ({
	[ actionTypes.SEARCH_MAIN_FORM ]: ( value ) => ({ value }),
  [ actionTypes.SEARCH_CLEAR_MAIN_FORM ]: () => ({
    mainForm: {
      group: '',
      objectType: 'all',
      documentType: 'all',
      registrationPeriod: {
        start: null,
        end: null
      },
      publicationPeriod: {
        start: null,
        end: null
      },
      status: 'all',
      categoryIndex: ''
    }
  }),
	[ actionTypes.EGR_SEARCH_DOCUMENTS_REQUEST ]: ( expression ) => ({ expression }),
  [ actionTypes.EGR_GENERATE_REPORT_REQUEST ]: ( expression ) => ({ expression }),
});

export default handleActions (
	{
		[ actionTypes.SEARCH_MAIN_FORM ]: ( state, { payload } ) => ({ 	
      mainForm: {
        ...state.mainForm,
        ...payload.value
      }
    }),
    [ actionTypes.SEARCH_CLEAR_MAIN_FORM ]: ( state, { payload: { mainForm } } ) => ({
			...state,
      mainForm: {
				...state.mainForm,
				...mainForm
			}
    }),
	},
	defaultState
);
