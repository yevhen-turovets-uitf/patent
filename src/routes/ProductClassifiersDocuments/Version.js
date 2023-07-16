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

export default React.memo(Version);

function Version() {
  const crumbs = [
    { to: '/', title: 'Онлайн Роспатент' },
    { to: openDataRoute, title: 'Открытые данные' },
    { to: classifiersRoute, title: 'Международные классификаторы' },
    { to: productClassifiersRoute, title: 'Международный классификатор товаров и услуг' },
    'Версии Международной классификации товаров и услуг (МКТУ)'
	],
    { mktuVersion } = useSelector ( ({ productClassifiers }) => productClassifiers ),
    dispatch = useDispatch();

  useEffect(
    () => {
      if (!mktuVersion) {
        dispatch( actions.mktuVersionRequest() )
      }
    },
    [ dispatch, mktuVersion ]
  );

  return (
    <>
      <Breadcrumbs crumbs={crumbs} />
      <h4 className="section-title">Версии Международной классификации товаров и услуг (МКТУ)</h4>
      <div className="product-classifiers-documents__content">
        {mktuVersion && mktuVersion.map(({ title, files, all_files }, index) => (
          <DropDownList
            key={title}
            title={title}
            isOpen={index === 0}
            {...{ files, all_files }}
          />
        ))}
      </div>      
    </>
  );
};
