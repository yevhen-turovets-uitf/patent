import { all, delay, takeEvery, put } from 'redux-saga/effects';
import * as actionTypes from 'actionTypes';
import actions from 'actions';
import api from 'api';


export default function* notifications ()
{
	yield all ([
		loadNotifications(),
		takeEvery ( actionTypes.MARK_NOTIFICATION_AS_READ_REQUEST, markNotificationAsReadRequest )
	]);
}

export function* loadNotifications ()
{
	while ( true )
	{
		const { result: notifications = [], error } = yield api.web.getNotifications(),
			badge = notifications.filter ( n => !n.custom.checked ).length;

		yield put ( error ?
			actions.error ( error )
			:
			actions.notifications ( notifications, badge )
		);

		yield delay ( 60000 );
	}
}

export function* markNotificationAsReadRequest ({ payload: { id } })
{
	const { error } = yield api.web.markNotificationAsRead ( id );

	yield put ( error ?
		actions.error ( error, true )
		:
		actions.markNotificationAsRead ( id )
	);
}
