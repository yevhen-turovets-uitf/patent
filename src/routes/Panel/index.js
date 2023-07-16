import React from 'react';
import { Switch, Route } from "react-router-dom";
import { Main, Profile, Help, Appeals } from 'routes';
import { Notifications } from 'components';
import {
	panelRoute,
	profileRoute,
	helpRoute,
	appealsRoute,
	servicesRoute,
	objectsRoute
} from 'urls';

const mainPath = [
	panelRoute,
	servicesRoute,
	objectsRoute
];


export default React.memo ( Panel );

function Panel ()
{
	return (
		<main className="panel">
			<div className="container">
				<div className="panel__wrapper">
					<div className="panel__content">
						<Switch>
							<Route exact path={ profileRoute } component={ Profile } />
							<Route exact path={ helpRoute } component={ Help } />
							<Route exact path={ appealsRoute } component={ Appeals } />
							<Route exact path={ mainPath } component={ Main } />
						</Switch>
					</div>
					<div className="panel__side-menu">
						<Notifications />
					</div>
				</div>
			</div>
		</main>
	);
}
