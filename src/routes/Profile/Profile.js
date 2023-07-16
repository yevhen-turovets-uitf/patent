import React from 'react';
import { HeadingBlock, Breadcrumbs } from 'components';
import { panelRoute } from 'urls';
import { useLegalData } from 'hooks';

export default React.memo ( Profile );

const crumbs = [
	{ to: panelRoute, title: 'Личный кабинет' },
	'Профиль'
];

function Profile ({ user }) {
	const [ name, legalStatus, legalId ] = useLegalData ( user );

	return (
		<div className="profile">
			<Breadcrumbs {...{ crumbs }} />
			<HeadingBlock title="Профиль" />
			<div className="profile__content">
				<div className="profile__avatar">
					<i className="base-icon-account"></i>
					</div>
				<div className="profile__name">{ name }</div>
				<div className="profile__details">
					<span className="profile__element">{ legalId }</span>
					<span className="profile__element">{ legalStatus }</span>
				</div>
			</div>
		</div>
	);
}
