import { createActions, handleActions } from 'redux-actions';
import * as actionTypes from 'actionTypes';

const defaultState = {
	notifications: [],
	badge: 0,
	show: false
};

export const actions = createActions ({
	[ actionTypes.NOTIFICATIONS_REQUEST ]: null,
	[ actionTypes.NOTIFICATIONS ]: ( notifications, badge ) => ({ notifications, badge }),
	[ actionTypes.SHOW_NOTIFICATIONS ]: show => ({ show }),
	[ actionTypes.MARK_NOTIFICATION_AS_READ_REQUEST ]: id => ({ id }),
	[ actionTypes.MARK_NOTIFICATION_AS_READ ]: id => ({ id })
});

export default handleActions (
	{
		[ actionTypes.NOTIFICATIONS ]: ( state, { payload: { notifications, badge } } ) => ({ ...state, notifications, badge }),
		[ actionTypes.SHOW_NOTIFICATIONS ]: ( state, { payload: { show } } ) => ({ ...state, show }),
		[ actionTypes.MARK_NOTIFICATION_AS_READ ]: markNotificationAsReadReducer
	},
	defaultState
);


function markNotificationAsReadReducer ( state, { payload: { id } } )
{
	const index = state.notifications.findIndex ( n => n.number === id );

	if ( index === -1 ) return state;

	const notifications = state.notifications.slice(),
		current = notifications[ index ];

	notifications[ index ] = {
		...current,
		custom: {
			...current.custom,
			checked: true
		}
	};

	return { ...state, notifications };
}
