import { all, takeLatest, put } from 'redux-saga/effects';
import * as actionTypes from 'actionTypes';
import actions from 'actions';
import api from 'api';

export default function* productClassifiers ()
{
	yield all ([
		takeLatest ( actionTypes.MKTU_SELECT_OPTIONS_REQUEST, getMktuClassCodes ),
		takeLatest ( actionTypes.MKTU_SEARCH_REQUEST, mktuSearch ),
		takeLatest ( actionTypes.MKTU_CLASS_LIST_REQUEST, getMktuClassList ),
		takeLatest ( actionTypes.MKTU_CLASS_DETAILED_REQUEST, getMktuClassDetailed ),
		takeLatest ( actionTypes.MKTU_VERSION_REQUEST, getMktuVersion ),
		takeLatest ( actionTypes.MKTU_VIENNESE_REQUEST, getMktuViennese ),
		takeLatest ( actionTypes.MKTU_IDENTIFIER_REQUEST, getMktuIdentifier ),
	]);
}

export function* getMktuClassCodes()
{
	const { result, error } = yield api.web.getMktuClassCodes();

	if ( error ) yield put ( actions.error ( error, true ) );

	yield put ( actions.mktuSelectOptions ( result, error ) );
}

export function* mktuSearch({ payload: { params } })
{
	const { result, error } = yield api.web.mktuSearch ( params );

	if ( error ) yield put ( actions.error ( error, true ) );

	yield put ( actions.mktuSearch ( result, error ) );
}

export function* getMktuClassList({ payload: { current_page } })
{
	const { result, error } = yield api.web.getMktuClassList ( current_page );

	if ( error ) yield put ( actions.error ( error, true ) );

	yield put ( actions.mktuClassList ( result, error ) );
}

export function* getMktuClassDetailed({ payload: { classNumber, current_page } })
{
	const { result, error } = yield api.web.getMktuClassDetailed ( classNumber, current_page );

	if ( error ) yield put ( actions.error ( error, true ) );

	yield put ( actions.mktuClassDetailed ( result, error ) );
}

export function* getMktuVersion()
{
	const { result, error } = yield api.web.getMktuVersion ();

	if ( error ) yield put ( actions.error ( error, true ) );

	yield put ( actions.mktuVersion ( result, error ) );
}

export function* getMktuViennese()
{
	const { result, error } = yield api.web.getMktuViennese ();

	if ( error ) yield put ( actions.error ( error, true ) );

	yield put ( actions.mktuViennese ( result, error ) );
}

export function* getMktuIdentifier()
{
	const { result, error } = yield api.web.getMktuIdentifier ();

	if ( error ) yield put ( actions.error ( error, true ) );

	yield put ( actions.mktuIdentifier ( result, error ) );
}