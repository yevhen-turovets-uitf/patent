import React, { useState, useCallback, useEffect } from 'react';
import { Breadcrumbs } from 'components';
import { panelRoute } from 'urls';
import Collapse from '@material-ui/core/Collapse';
import Fade from '@material-ui/core/Fade';
import Appeal from './Appeal';
import { useRequest } from 'hooks';
import AppealForm from './AppealForm';

export default React.memo ( Appeals );

const crumbs = [
	{ to: panelRoute, title: 'Личный кабинет' },
	'Обращения'
];

function Appeals ()
{
	const [ { result: options = [] },, optionsError ] = useRequest ( 'getAppealSubjects' ),
		[ isOpen, setIsOpen ] = useState ( false ),
		[ appeals, setAppeals ] = useState ( [] ),
		[ { result },, appealsError ] = useRequest ( 'getAppeals' ),
		open = useCallback (
			e => {
				e.preventDefault();

				setIsOpen ( true );
			},
			[]
		),
		close = useCallback (
			e => {
				if ( e ) e.preventDefault();

				setIsOpen ( false );
			},
			[]
		);

	useEffect (
		() => setAppeals ( ( result || {} ).messages || [] ),
		[ result ]
	);

	return (
		<div className="appeals">
			<Breadcrumbs {...{ crumbs }} />
			<div className="heading-block page-title with-link">
				<h1 className="h">Обращения</h1>
				<Fade in={ !!options.length && !isOpen } timeout={ 400 }>
					<a className="button-style1 add-button add-appeal-button" href="/" onClick={ open }>
						<em>+</em>
						<span>Новое обращение</span>
					</a>
				</Fade>
			</div>
			<Collapse in={ !!options.length && isOpen } timeout={ 400 }>
				<div style={{ position: 'relative' }} className="appeal-add-form form-box">
					<h5 className="title">Новое обращение</h5>
					<AppealForm {...{ isOpen, close, setAppeals }} />
				</div>
			</Collapse>
			{ ( !!optionsError && optionsError.message ) || ( !!appealsError && appealsError.message ) }
			<div className="messages-items">
				{ appeals.map ( appeal => <Appeal key={ appeal.id } { ...appeal } /> ) }
			</div>
		</div>
	);
}
