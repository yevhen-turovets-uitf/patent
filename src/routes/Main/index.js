import React from 'react';
import { Switch, Route } from "react-router-dom";
import { LcInfoLinks } from 'components';
import { Statements, Objects, Services } from 'routes';
import {
	panelRoute,
	servicesRoute,
	objectsRoute
} from 'urls';

export default React.memo ( Main );

function Main ()
{
	return (
		<React.Fragment>
			<LcInfoLinks />
			<Switch>
				<Route exact path={ servicesRoute } component={ Services } />
				<Route exact path={ objectsRoute } component={ Objects } />
				<Route exact path={ panelRoute } component={ Statements } />
			</Switch>
		</React.Fragment>
	);
}
