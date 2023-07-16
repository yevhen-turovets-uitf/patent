/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import actions from 'actions';
import { stripTags } from 'functions';
import moment from 'moment';
import clsx from 'clsx';


export default React.memo ( Notification );

function Notification ({ custom: { checked } = {}, creationDate, number, finalDecision })
{
	const history = useHistory(),
		dispatch = useDispatch(),
		onClick = useCallback (
			() => {
				history.push ( `/panel/appeals#${ number }` );

				if ( !checked ) dispatch ( actions.markNotificationAsReadRequest ( number ) );
			},
			[ history, checked, number, dispatch ]
		);

	return (
		<div className={ clsx ( 'item', !checked && 'unread' ) } {...{ onClick }}>
			<div className="top">
				<div className="type">Техническая поддержка</div>
				<div className="date">{ getDate ( creationDate ) }</div>
			</div>
			<div className="title">Ответ на обращение № { number }</div>
			<div className="text">{ stripTags ( finalDecision ) }</div>
		</div>
	);
}

function getDate ( date )
{
	const current = moment ( date ),
		now = moment(),
		isToday = current.isSame (
			now.clone().startOf ( 'day' ),
			'd'
		),
		isYesterday = !isToday && current.isSame (
			now.clone().subtract ( 1, 'days' ).startOf ( 'day' ),
			'd'
		);

	return current.format ( isToday ? 'HH:mm' : isYesterday ? 'Вчера' : 'DD.MM.YYYY' );
}
