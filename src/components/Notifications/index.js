import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import Notification from './Notification';
import { useDispatch } from 'react-redux';
import actions from 'actions';
import clsx from 'clsx';


export default React.memo ( Notifications );

function Notifications ({ mini })
{
	const { notifications, badge, show } = useSelector ( st => st.notifications ),
		dispatch = useDispatch(),
		hideNotifications = useCallback (
			() => dispatch ( actions.showNotifications ( false ) ),
			[ dispatch ]
		);

	return (
		<div className={ clsx ( 'notifications-block', !!mini && 'mini', show && 'show' ) }>
			<div className="top">
				<h6 className="heading">Уведомления</h6>
				<div className="notifications-count">
					<i className="base-icon-bell" />
					<span>{ badge }</span>
				</div>
				<div className="close base-icon-cross" onClick={ hideNotifications } />
			</div>
			<div className="scrollbar-inner">
				<div className="items">
					{ notifications.map ( notification => (
						<Notification
							key={ notification.id }
							{ ...notification }
						/>
					) ) }
				</div>
			</div>
		</div>
	);
}
