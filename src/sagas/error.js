import { takeLatest, put } from 'redux-saga/effects';
import * as actionTypes from 'actionTypes';
import actions from 'actions';


export default function* root ()
{
	yield takeLatest ( actionTypes.ERROR, handleError );
}

export function* handleError ({ payload: { error: { code, message } = {}, runAlert } = {} })
{
	if ( code === 'unauthorized' ) yield put ( actions.logout() );

	if ( code === '404' ) yield put ( actions.page404 ( true ) );
	else if ( runAlert && message ) alert ( message ); // prevent alert while 404
}
