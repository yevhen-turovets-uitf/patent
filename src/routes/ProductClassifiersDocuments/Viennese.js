import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import filesize from 'filesize';
import {
  openDataRoute,
  classifiersRoute,
  productClassifiersRoute
} from 'urls';
import {
  Breadcrumbs
} from 'components';
import actions from 'actions';

export default React.memo(Viennese);

function Viennese() {
  const crumbs = [
    { to: '/', title: 'Онлайн Роспатент' },
    { to: openDataRoute, title: 'Открытые данные' },
    { to: classifiersRoute, title: 'Международные классификаторы' },
    { to: productClassifiersRoute, title: 'Международный классификатор товаров и услуг' },
    'Международная классификация изобразительных элементов товарных знаков (Венская классификация)'
	],
    { mktuViennese } = useSelector ( ({ productClassifiers }) => productClassifiers ),
    dispatch = useDispatch();

  useEffect(
    () => {
      if (!mktuViennese) {
        dispatch( actions.mktuVienneseRequest() )
      }
    },
    [ dispatch, mktuViennese ]
  );
  
  return (
    <>
      <Breadcrumbs crumbs={crumbs} />
      <h4 className="section-title">
        Международная классификация изобразительных элементов товарных знаков (Венская классификация)
      </h4>
      <div className="product-classifiers-documents__content">
        {mktuViennese && mktuViennese.map(
          ({ link, text, weight }) => (
            <div key={text} className="product-classifiers-documents__link-wrapper">
              <a
                key={text}
                href={link}
                className="product-classifiers-documents__link"
                download
              >
                { text }
              </a>
              <span className="product-classifiers-documents__weight">
                {', '}
                { filesize(weight) }
              </span>
            </div>
          )
        )}
      </div>
    </>
  );
};
