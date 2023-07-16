import React, { useRef, useEffect } from 'react';
import { matchPath } from 'react-router';
import { NavLink, useLocation } from 'react-router-dom';
import Swiper from 'swiper';
import {
	panelRoute,
	servicesRoute,
	objectsRoute
} from 'urls';

const slides = [
	{
		path: panelRoute,
		label: <React.Fragment>Мои заявления<br />и заявки</React.Fragment>,
		count: 'statements'
	},
	{
		path: objectsRoute,
		label: 'Мои объекты',
		count: 'objects'
	},
	{
		path: servicesRoute,
		label: <React.Fragment>Подать заявку<br />или заявление</React.Fragment>,
		icon: 'plus-2'
	}
];


export default React.memo ( LcInfoLinks );

function LcInfoLinks ( props )
{
	const ref = useRef ( null ),
		swiperRef = useRef(),
		{ pathname } = useLocation();

	useEffect (
		() => {
			swiperRef.current = new Swiper ( ref.current, {
				initialSlide: getCurrentSlide ( pathname ),
				slidesPerView: 'auto',
				freeMode: true,
				spaceBetween: 25,
				freeModeMomentumBounce: false, // prevent jump on mobile
				breakpoints: {
					992: {
						slidesPerView: 3
					}
				}
			});
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	useEffect (
		() => {
			const index = getCurrentSlide ( pathname );

			if ( swiperRef.current )
			{
				swiperRef.current.slideTo ( index );
			}
		},
		[ pathname ]
	);

	return (
		<div {...{ ref }} className="lc-info-links swiper-container">
			<div className="swiper-wrapper">
				{ slides.map ( ({ path, label, count, icon }) => (
					<div key={ path } className="swiper-slide">
						<NavLink exact className="item" activeClassName="current" to={ path }>
							<span className="label">{ label }</span>
							{ count &&
								<span className="count">{ props[ count ] }</span>
							}
							{ icon &&
								<i className={ 'base-icon-' + icon } />
							}
						</NavLink>
					</div>
				) ) }
			</div>
		</div>
	);
}


function getCurrentSlide ( pathname )
{
	return slides.findIndex (
		({ path }) => matchPath ( pathname, { path, exact: true } )
	);
}
