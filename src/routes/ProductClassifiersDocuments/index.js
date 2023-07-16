import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route } from "react-router-dom";
import { useLocation } from 'react-router';
import {
  PageWithSideMenu,
  ClassifiersSideMenu,
	Waiter
} from 'components';
import { productClassifiersLinks } from 'staticData';
import {
	productClassifiersVersionRoute,
  productClassifiersVienneseRoute,
  productClassifiersIdentifierRoute
} from 'urls';
import Version from './Version';
import Viennese from './Viennese';
import Identifier from './Identifier';

export default React.memo ( ProductClassifiersDocuments );

function ProductClassifiersDocuments () {
	const
	{ pathname } = useLocation(),
	{ waiter } = useSelector ( ({ productClassifiers }) => productClassifiers );

	return (
		<PageWithSideMenu
			className="product-classifiers-documents"
			menu={<ClassifiersSideMenu items={productClassifiersLinks} closedType={pathname}/>}
		>
			<Switch>
				<Route exact path={ productClassifiersVersionRoute } component={ Version } />
				<Route exact path={ productClassifiersVienneseRoute } component={ Viennese } />
				<Route exact path={ productClassifiersIdentifierRoute } component={ Identifier } />
			</Switch>
			{!!waiter && <Waiter />}
		</PageWithSideMenu>
	);
}
