import React from 'react';
import { NavLink } from 'react-router-dom';
import { openDataRoute } from 'urls';
import { Breadcrumbs } from 'components';
import { officialBulletinsMainData, officialBulletinsSideData } from 'staticData';
import DropDownList from './DropDownList';

export default React.memo(OfficialBulletins);

function OfficialBulletins() {
	const crumbs = [
		{ to: '/', title: 'Онлайн Роспатент' },
		{ to: openDataRoute, title: 'Открытые данные' },
		'Официальные публикации и бюллетени'
	];

	return (
		<main className="official-bulletins">
			<div className="container">
				<div className="official-bulletins__container">
					<Breadcrumbs crumbs={crumbs} />
					<h4 className="section-title">Официальные публикации и бюллетени</h4>
					<div className="official-bulletins__content">
						<div className="official-bulletins__aside">
							<div className="official-bulletins__grid">
								{officialBulletinsMainData.map(({ image, link, rows }) => (
									<NavLink
										key={link}
										to={link}
										className="official-bulletins__grid-item"
										target="_blank"
										rel="noreferrer"
									>
										<img
											className="official-bulletins__image"
											src={image}
											alt=""
										/>
										{rows.map(({ text }) => (
											<div key={text} className="official-bulletins__link">
												{ text }
											</div>
										))}
									</NavLink>
								))}
							</div>
						</div>
						<div className="official-bulletins__side-menu">
							<h3 className="official-bulletins__title">Дополнительные источники данных</h3>
							{officialBulletinsSideData.map(
								({ title, links }) => (
									<DropDownList key={title} {...{ title, links }}/>
								)
							)}
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
