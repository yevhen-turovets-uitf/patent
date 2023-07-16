import React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import {
	authRoute,
	panelRoute,
	profileRoute,
	helpRoute,
	appealsRoute,
	servicesRoute,
	objectsRoute,
	statementRoute,
	openDataRoute,
	openApiRoute,
	officialBulletinsRoute,
	openRegistersRoute,
	openRegistersSearchRoute,
	objectionsRoute,
	objectionsRegisterRoute,
	solutionsRoute,
	extendedSearchRoute,
	classifiersRoute,
	productClassifiersRoute,
	productClassifiersClassesRoute,
	productClassifiersVersionRoute,
  productClassifiersVienneseRoute,
  productClassifiersIdentifierRoute,
	industrialClassifiersRoute,
	industrialClassifiersGroupRoute,
	industrialClassifiersClassListRoute,
	industrialClassifiersAlphabeticalListRoute,
	industrialClassifiersVersionsRoute,
	dutiesRoute,
	workInfoRoute,
	chamberInfoRoute,
	patentAttorneysRoute,
	statementsRegisterRoute,
	disputedObjectionsRegisterRoute
} from 'urls';
import { SiteHeader, SiteFooter, Assistant, RoleModal } from 'components';
import {
	Service,
	Panel,
	FilledStatement,
	Auth,
	Statement,
	Page404,
	OpenDataPages,
	PatentAttorneys
} from 'routes';
import { useSelector } from 'react-redux';

export default React.memo(Root);

function Root({ auth }) {
	const page404 = useSelector(st => st.ui.page404);
	const location = useLocation();

	const panelPages = [
		panelRoute,
		profileRoute,
		helpRoute,
		appealsRoute,
		servicesRoute,
		objectsRoute
	];

	const openDataPages = [
		openDataRoute,
		openApiRoute,
		officialBulletinsRoute,
		`${officialBulletinsRoute}/:type`,
		openRegistersRoute,
		openRegistersSearchRoute,
		`${openRegistersSearchRoute}/:number`,
		`${productClassifiersClassesRoute}/:productClass`,
		objectionsRoute,
		objectionsRegisterRoute,
		statementsRegisterRoute,
		disputedObjectionsRegisterRoute,
		solutionsRoute,
		extendedSearchRoute,
		classifiersRoute,
		productClassifiersRoute,
		productClassifiersClassesRoute,
		productClassifiersVersionRoute,
		productClassifiersVienneseRoute,
		productClassifiersIdentifierRoute,
		industrialClassifiersRoute,
		`${industrialClassifiersGroupRoute}/:group`,
		industrialClassifiersClassListRoute,
		industrialClassifiersAlphabeticalListRoute,
		industrialClassifiersVersionsRoute,
		dutiesRoute,
		workInfoRoute,
		chamberInfoRoute
	];

	const Footer = () => !auth && !page404 && <SiteFooter />

	return (
		<React.Fragment>
			<SiteHeader className={location.pathname === authRoute ? 'site-header--bg' : ''} {...{ auth }} />
			{auth ?
				page404 ?
					<Route component={ Page404 } />
					:
					<Switch>
						<Route exact path={ panelPages } component={ Panel } />
						<Route exact path={ `${statementRoute}/:statementId/edit` } component={ Statement } />
						<Route exact path={ `${statementRoute}/:id` } component={ FilledStatement } />
						<Route exact path={ `${servicesRoute}/:serviceName` } component={ Service } />
						<Route exact path={ openDataPages } component={ OpenDataPages } />
						<Route exact path={ patentAttorneysRoute } component={ PatentAttorneys } />
						<Route exact path="/">
							<Redirect to={ panelRoute } />
						</Route>
						<Route component={ Page404 } />
					</Switch>
				:
				<Switch>
					<Route exact path={ authRoute } component={ Auth } />
					<Route exact path={ openDataPages } component={ OpenDataPages } />
					<Route exact path={ patentAttorneysRoute } component={ PatentAttorneys } />
					<Route>
						<Redirect to={ authRoute } />
					</Route>
				</Switch>
			}
			<Footer />
			<Assistant />
			<RoleModal />
		</React.Fragment>
	);
}
