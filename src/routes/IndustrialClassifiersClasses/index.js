import React from 'react';
import { Switch, Route } from "react-router-dom";
import {
  industrialClassifiersClassListRoute,
  industrialClassifiersAlphabeticalListRoute
} from 'urls';
import {
  PageWithSideMenu,
  ClassifiersSideMenu
} from 'components';
import { industrialClassifiersLinks } from 'staticData';
import ClassList from './ClassList';
import AlphabeticalList from './AlphabeticalList';

export default React.memo ( IndustrialClassifiersClasses );

function IndustrialClassifiersClasses ()
{
	return (
		<PageWithSideMenu
			className="industrial-classifiers-classes"
			menu={<ClassifiersSideMenu items={industrialClassifiersLinks} />}
		>
			<Switch>
				<Route exact path={ industrialClassifiersClassListRoute } component={ ClassList } />
				<Route exact path={ industrialClassifiersAlphabeticalListRoute } component={ AlphabeticalList } />
			</Switch>
		</PageWithSideMenu>
	);
}