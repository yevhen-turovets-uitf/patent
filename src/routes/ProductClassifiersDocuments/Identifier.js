import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  openDataRoute,
  classifiersRoute,
  productClassifiersRoute
} from 'urls';
import {
  Breadcrumbs
} from 'components';
import actions from 'actions';
import DropDownList from './DropDownList';

export default React.memo(Identifier);

function Identifier() {
  const crumbs = [
    { to: '/', title: 'Онлайн Роспатент' },
    { to: openDataRoute, title: 'Открытые данные' },
    { to: classifiersRoute, title: 'Международные классификаторы' },
    { to: productClassifiersRoute, title: 'Международный классификатор товаров и услуг' },
    'Лексико-семантический идентификатор товаров и услуг'
	],
    { mktuIdentifier } = useSelector ( ({ productClassifiers }) => productClassifiers ),
    dispatch = useDispatch();

  useEffect(
    () => {
      if (!mktuIdentifier) {
        dispatch( actions.mktuIdentifierRequest() )
      }
    },
    [ dispatch, mktuIdentifier ]
  );
  
  return (
    <>
      <Breadcrumbs crumbs={crumbs} />
      <h4 className="section-title">Лексико-семантический идентификатор товаров и услуг</h4>
      <div className="product-classifiers-documents__content">
        {mktuIdentifier && mktuIdentifier.map(({ title, files, description, all_files }, index) => (
          <DropDownList
            key={title}
            isOpen={index === 0}
            {...{ title, files, description, all_files }}
          />
        ))}
      </div>
    </>
  );
};
