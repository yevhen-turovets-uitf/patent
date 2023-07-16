import { all, takeLatest, put, delay, select } from 'redux-saga/effects';
import Cookies from 'js-cookie';
import * as actionTypes from 'actionTypes';
import actions from 'actions';
import api from 'api';


export default function* auth ()
{
	yield all ([
		takeLatest ( actionTypes.LOGIN, login ),
		takeLatest ( actionTypes.LOGOUT, logout )
	]);
}

export function* login ()
{
	const auth = yield select ( ({ auth }) => auth );

	if ( !auth ) return;

	const { result, error } = yield api.web.profile();

	if ( error )
	{
		yield put ( actions.error ( error ) );

		yield delay ( 1000 );

		yield login();
	}
	else yield put ( actions.setUser ( result ) );
}

export function* logout ()
{
	if ( Cookies.get ( 'csrftoken' ) )
	{
		Cookies.remove ( 'csrftoken' );

		if ( process.env.NODE_ENV !== 'development' ) window.location = '/accounts/logout';
	}
	else yield put ( actions.setUser ( {} ) );

	// For dev auth (part of workaround).
	if ( process.env.NODE_ENV === 'development' )
	{
		Cookies.set ( 'csrftoken', '' );
		Cookies.set ( 'sessionid', '' );
	}
}
