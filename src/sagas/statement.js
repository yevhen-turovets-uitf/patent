import { all, takeLatest, takeEvery, put } from 'redux-saga/effects';
import * as actionTypes from 'actionTypes';
import { select } from 'redux-saga/effects'
import actions from 'actions';
import { getNormalizedId, getChildrens } from 'functions';
import api from 'api';

export default function* statement ()
{
	yield all ([
		takeLatest ( actionTypes.REQUEST_STATEMENT, requestStatement ),
		takeLatest ( actionTypes.ADD_STATEMENT_SECTION_REQUEST, addStatementSectionRequest ),
		takeEvery ( actionTypes.VALIDATE_SECTIONS_REQUEST, validateSectionsRequest ),
		takeLatest ( actionTypes.VALIDATE_STATEMENT_REQUEST, validateStatementRequest ),
		takeLatest ( actionTypes.ACCEPT_STATEMENT_REQUEST, acceptStatementRequest ),
		takeLatest ( actionTypes.CHANGE_STATEMENT_STATUS_REQUEST, changeStatementStatusRequest ),
		takeEvery ( actionTypes.EDIT_FIELD_REQUEST, editFieldRequest ),
		takeLatest ( actionTypes.REMOVE_STATEMENT_SECTION_REQUEST, removeStatementSectionRequest ),
		takeLatest ( actionTypes.SELECT_EXTERNAL_SECTIONS_REQUEST, selectExternalSectionsRequest ),
		takeEvery ( actionTypes.UPLOAD_FILE_REQUEST, uploadFileRequest )
	]);
}

export function* requestStatement ({ payload: { id, waiter } })
{
	const [ { result, error }, { error: error2 } ] = yield all ([
		api.web.getStatement ( id ),
		api.web.validateStatement ( id )
	]);

	if ( error || error2 )
	{
		yield put ( actions.error ( error || error2, true ) );
	}

	yield put (
		actions.statement (
			error ? { error } : result,
			error2 && error2.messages,
			waiter
		)
	);
}

export function* addStatementSectionRequest ({ payload: { statementId, sectionId, waiter } })
{
	const { result, error } = yield api.web.addSection ( statementId, sectionId );

	if ( error ) yield put ( actions.error ( error ) );

	yield put ( actions.addStatementSection ( sectionId, result, waiter, error ) );
}

export function* validateSectionsRequest ({ payload: { statementId, sectionId } })
{
	const { error } = yield api.web.validateSections ( statementId, sectionId );

	if ( error ) yield put ( actions.error ( error, true ) );

	yield put ( actions.validateSections ( statementId, sectionId, error ) );
}

export function* validateStatementRequest ({ payload: { id, waiter } })
{
	const { error } = yield api.web.validateStatement ( id );

	if ( error ) yield put ( actions.error ( error, true ) );

	yield put ( actions.validateStatement ( id, waiter, error ) );
}

export function* acceptStatementRequest ({ payload: { id, waiter } })
{
	const { error } = yield api.web.acceptStatement ( id );

	if ( error ) yield put ( actions.error ( error ) );

	yield put ( actions.acceptStatement ( id, waiter, error ) );
}

export function* changeStatementStatusRequest ({ payload: { id, waiter } })
{
	const { error } = yield api.web.changeStatementStatus ( id );

	if ( error ) yield put ( actions.error ( error, true ) );

	yield put ( actions.changeStatementStatus ( id, waiter, error ) );
}

export function* editFieldRequest ({ payload: { statementId, id, value, normalizedId } })
{
	const isFile = value instanceof Blob,
		{ error, result } = yield api.web.editField ( id, value, isFile );

	if ( error ) yield put ( actions.error ( error ) );

	yield put ( actions.editField (
		statementId,
		id,
		isFile ? value.name : value,
		result,
		( error && ( ( error.messages && error.messages.value ) || error.message ) ) || false,
		normalizedId
	) );

	return [error, result];
}

export function* removeStatementSectionRequest ({ payload: { sectionId, id, waiter } })
{
	const { result, error } = yield api.web.removeSection ( id );

	if ( error )
	{
		yield put ( actions.error ( error ) );

		alert ( error.message );
	}

	yield put ( actions.removeStatementSection ( sectionId, id, result, error, waiter ) );
}

export function* selectExternalSectionsRequest ({ payload: { statementId, sectionId, ids } })
{
	const { result, error } = yield api.web.selectExternalSections ( statementId, sectionId, ids );

	if ( error ) yield put ( actions.error ( error, true ) );

	yield put ( actions.selectExternalSections ( statementId, sectionId, ids, result, error ) );
}

export const getChildrensSelect = (parent, type) => (state) => {
	const normalized = state.statement.normalized;

	return getChildrens(normalized, parent, type);
}

export function* uploadFileRequest ({ payload: { statementId, id, value, sectionId, waiter } })
{
	const normalizedId = getNormalizedId ( id, 'FILE' ),
		[editError, result] = yield editFieldRequest ({ payload: { statementId, id, value, normalizedId } });

	const childs = yield select(getChildrensSelect(id, 'TEXT')); 
	if(childs.length) {
		const field = childs[0]

		yield put ( actions.editField (
			statementId,
			field.id,
			result.document_info.count_pages,
			result,
			false,
			field.id
		) );
	}

	if ( editError ) yield put ( actions.error ( editError ) );
	else
	{
		yield put ( actions.addStatementSectionRequest ( statementId, sectionId ) );
	}

	yield put ( actions.uploadFile ( waiter ) )
}
