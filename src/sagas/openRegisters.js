import { all, takeLatest, put } from 'redux-saga/effects';
import * as actionTypes from 'actionTypes';
import actions from 'actions';
import api from 'api';

export default function* search ()
{
	yield all ([
		takeLatest ( actionTypes.EGR_SEARCH_DOCUMENTS_REQUEST, egrSearchDocumentsRequest ),
		takeLatest ( actionTypes.EGR_GENERATE_REPORT_REQUEST, egrGenerateReportRequest ),
	]);
}

export function* egrSearchDocumentsRequest ({ payload: { expression } })
{
	const { result, error } = yield api.web.egrSearchDocuments ( expression );

	if ( error ) yield put ( actions.error ( error ) );

  console.log(result)
	// yield put ( actions.addStatementSection ( result ) );
}

export function* egrGenerateReportRequest ({ payload: { expression } })
{
	const { result, error } = yield api.web.egrGenerateReport ( expression );

	if ( error ) yield put ( actions.error ( error ) );

  console.log(result)
	// yield put ( actions.addStatementSection ( result ) );
}
