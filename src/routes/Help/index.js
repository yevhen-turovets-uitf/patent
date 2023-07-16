import React, { useCallback } from 'react';
import { HeadingBlock, Breadcrumbs, PrimaryButton } from 'components';
import { withRouter } from 'react-router-dom';
import { helpLinksData } from 'staticData';
import {
	panelRoute,
	appealsRoute
} from 'urls';

export default React.memo ( withRouter ( Help ) );

const crumbs = [
	{ to: panelRoute, title: 'Личный кабинет' },
	'Поддержка пользователей'
];

function Help ({ history }) {
	const onClick = useCallback (
		() => history.push ( appealsRoute ),
		[ history ]
	);

	return (
		<div className="help-page">
			<Breadcrumbs {...{crumbs}} />
			<HeadingBlock title="Поддержка пользователей">
				<PrimaryButton lightGray title="Обращения" {...{onClick}} />
			</HeadingBlock>
			{ 
				helpLinksData.map (({ title, icon, href }, index) => (
					<a key={index} className="help-page__download-wrapper" target="_blank" {...{href}}>
						<div className={`help-page__icon ${icon}`}/>
						<div className="help-page__title">{title}</div>
					</a>
				))
			}
		</div>
	);
}
