import React, { useRef, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Linkify from 'react-linkify';
import { stripTags, scrollWindowToElement } from 'functions';
import moment from 'moment';
import clsx from 'clsx';

const componentDecorator = ( href, text, key ) => (
	<a
		{...{ key, href }}
		target="_blank"
		rel="nofollow noopener"
	>
		{ text }
	</a>
);


export default React.memo ( Appeal );

function Appeal ({ number, creationDate, subject, description, actualDecisionDate, finalDecision })
{
	const ref = useRef(),
		strippedFinalDecision = useMemo (
			() => stripTags ( finalDecision ),
			[ finalDecision ]
		),
		location = useLocation();

	useEffect (
		() => {
			if ( ref.current && location.hash && location.hash === '#' + number )
			{
				scrollWindowToElement ( ref.current );
			}
		},
		[ number, location ]
	);

	return (
		<div {...{ ref }} className={ clsx ( 'message-item', !!finalDecision && 'answered' ) }>
			<div className="top">
				<div className="date">Обращение № { number } от { moment ( creationDate ).format ( 'DD.MM.YYYY HH:mm' ) }</div>
				<div className="title">Тема: <span>{ subject }</span></div>
			</div>
			<div className="text">
				<Linkify {...{ componentDecorator }}>
					«{ useMemo ( () => stripTags ( description ), [ description ] ) }»
				</Linkify>
			</div>
			{ finalDecision &&
				<div className="answer">
					<div className="date">Ответ технического специалиста от { moment ( actualDecisionDate ).format ( 'DD.MM.YYYY HH:mm' ) }</div>
					<div className="text">
						<Linkify {...{ componentDecorator }}>{ strippedFinalDecision }</Linkify>
					</div>
				</div>
			}
		</div>
	);
}
