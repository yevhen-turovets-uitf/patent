import React from 'react';
import { Breadcrumbs, LinkOrRoute } from 'components';
import { openDataMainLinks } from 'staticData';

export default React.memo(OpenData);

function OpenData() {
	const crumbs = [
		{ to: '/', title: 'Онлайн Роспатент' },
		'Открытые данные'
	];

	return (
		<main className="open-data">
			<div className="container">
				<Breadcrumbs crumbs={crumbs} />
        <h4 className="section-title">Открытые данные</h4>
				<div className="open-data__content">
					{openDataMainLinks.map(({ to, text, type, route }) => (
						<LinkOrRoute
							key={type} 
							className="open-data__grid-item"
							{...{ to, route }}
						>
							<div className="link-text">{ text }</div>
							<div className="arrow base-icon-next-4"></div>
						</LinkOrRoute>
					))}
				</div>
			</div>
		</main>
	);
}
