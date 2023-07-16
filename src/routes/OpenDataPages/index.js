import React from 'react';
import { Switch, Route } from "react-router-dom";
import {
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
	statementsRegisterRoute,
	disputedObjectionsRegisterRoute
} from 'urls';
import {
	Search,
	OpenApi,
	OpenData,
	OfficialBulletins,
	OfficialBulletinsDetailed,
	OpenRegisters,
	SearchCard,
	Objections,
	ObjectionsRegister,
	Solutions,
	ExtendedSearch,
	Classifiers,
	ProductClassifiers,
	ProductClassifiersClasses,
	ProductClassifiersDetailed,
  ProductClassifiersDocuments,
	IndustrialClassifiers,
	IndustrialClassifiersDetailed,
	IndustrialClassifiersClasses,
	IndustrialClassifiersVersions,
	Duties,
	WorkInfo,
	ChamberInfo,
	StatementsRegister,
	DisputedObjectionsRegister
} from 'routes';

export default React.memo ( OpenDataPages );

function OpenDataPages () {
  const productClassifiersDocuments = [
    productClassifiersVersionRoute,
    productClassifiersVienneseRoute,
    productClassifiersIdentifierRoute
  ];

	const industrialClassifiersClasses = [
		industrialClassifiersClassListRoute,
		industrialClassifiersAlphabeticalListRoute,
	]

	return (
		<React.Fragment>
			<Switch>
        <Route exact path={ openDataRoute } component={ OpenData } />
        <Route exact path={ officialBulletinsRoute } component={ OfficialBulletins } />
        <Route exact path={ `${officialBulletinsRoute}/:type` } component={ OfficialBulletinsDetailed } />
        <Route exact path={ openRegistersRoute } component={ OpenRegisters } />
        <Route exact path={ `${openRegistersSearchRoute}/:number` } component={ SearchCard } />
        <Route exact path={ openRegistersSearchRoute } component={ Search } />
        <Route exact path={ openApiRoute } component={ OpenApi } />
        <Route exact path={ objectionsRoute } component={ Objections } />
        <Route exact path={ objectionsRegisterRoute } component={ ObjectionsRegister } />
        <Route exact path={ solutionsRoute } component={ Solutions } />
        <Route exact path={ extendedSearchRoute } component={ ExtendedSearch } />
        <Route exact path={ classifiersRoute } component={ Classifiers } />
        <Route exact path={ productClassifiersRoute } component={ ProductClassifiers } />
        <Route exact path={ productClassifiersClassesRoute } component={ ProductClassifiersClasses } />
        <Route exact path={ `${productClassifiersClassesRoute}/:productClass` } component={ ProductClassifiersDetailed } />
        <Route exact path={ productClassifiersDocuments } component={ ProductClassifiersDocuments } />
        <Route exact path={ industrialClassifiersRoute } component={ IndustrialClassifiers } />
        <Route exact path={ `${industrialClassifiersGroupRoute}/:group` } component={ IndustrialClassifiersDetailed } />
        <Route exact path={ industrialClassifiersVersionsRoute } component={ IndustrialClassifiersVersions } />
        <Route exact path={ industrialClassifiersClasses } component={ IndustrialClassifiersClasses } />
        <Route exact path={ dutiesRoute } component={ Duties } />
        <Route exact path={ workInfoRoute } component={ WorkInfo } />
        <Route exact path={ chamberInfoRoute } component={ ChamberInfo } />
        <Route exact path={ statementsRegisterRoute } component={ StatementsRegister } />
        <Route exact path={ disputedObjectionsRegisterRoute } component={ DisputedObjectionsRegister } />
			</Switch>
		</React.Fragment>
	);
}
