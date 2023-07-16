import { all, takeEvery, takeLatest, select, put } from 'redux-saga/effects';
import * as actionTypes from 'actionTypes';
import actions from 'actions';
import api from 'api';
import { statementRoute } from 'urls';

export default function* statements ()
{
	yield all ([
		takeEvery ( actionTypes.STATEMENTS_REQUEST, statementsRequest ),
		takeLatest ( actionTypes.REMOVE_STATEMENT_REQUEST, removeStatementRequest ),
		takeLatest ( actionTypes.COPY_STATEMENT_REQUEST, copyStatementRequest )
	]);
}

export function* statementsRequest ({ payload: { params, isFiltered, index } })
{
	const { error, result } = yield api.web.getFilledStatements ( params );

	if ( error ) yield put ( actions.error ( error ) );

	yield put ( actions.statements ( { ...result, params, isFiltered, error }, index ) );
}

export function* removeStatementRequest ({ payload: { id, callback } })
{
	const { error } = yield api.web.removeDraftStatement ( id );

	if ( error ) yield put ( actions.error ( error, true ) );

	if ( callback ) callback();
	else
	{
		const lists = yield select ( st => st.statements.lists );

		yield all (
			lists.reduce (
				( res, { params, statements, isFiltered, total }, i ) => {
					const { offset, limit, status } = params;

					if ( status === 'PROCESSING' ) return res;

					if ( total - 1 <= offset && offset - limit >= 0 ) params.offset -= limit;

					return [ ...res, statementsRequest ({ payload: { params, isFiltered, index: i } }) ];
				},
				[]
			)
		);
	}

	yield put ( actions.removeStatement() );
}

export function* copyStatementRequest ({ payload: { id } })
{
	const { error, result } = yield api.web.copyStatement ( id );

	if ( error ) yield put ( actions.error ( error, true ) );
	else yield put ( actions.history ( 'push', `${ statementRoute }/${ result.id }/edit` ) )

	yield put ( actions.copyStatement() );
}
