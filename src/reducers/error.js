import { createActions } from 'redux-actions';
import * as actionTypes from 'actionTypes';


export const actions = createActions ({
	[ actionTypes.ERROR ]: ( error, runAlert ) => ({ error, runAlert })
});
