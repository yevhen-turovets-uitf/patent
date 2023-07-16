import { debounce, select, put } from 'redux-saga/effects';
import * as actionTypes from 'actionTypes';
import actions from 'actions';


export default function* ui ()
{
	yield debounce (
		500,
		[ actionTypes.STATEMENTS, actionTypes.REMOVE_STATEMENT ],
		updateStatementsTotal
	);
}

export function* updateStatementsTotal ()
{
	const lists = yield select ( st => st.statements.lists );

	const statementsTotal = lists.reduce (
		( res, { total = 0, isFiltered } ) => isFiltered ? res : res + total,
		0
	);

	yield put ( actions.setStatementsTotal ( statementsTotal ) );
}
