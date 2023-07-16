import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  openDataRoute,
  classifiersRoute,
  productClassifiersRoute,
  productClassifiersClassesRoute
} from 'urls';
import {
  PageWithSideMenu,
  Breadcrumbs,
  ClassifiersSideMenu,
  Pagination,
  Waiter
} from 'components';
import actions from 'actions';
import { productClassifiersLinks } from 'staticData';

export default React.memo(ProductClassifiersClasses);

function ProductClassifiersClasses() {
  const crumbs = [
    { to: '/', title: 'Онлайн Роспатент' },
    { to: openDataRoute, title: 'Открытые данные' },
    { to: classifiersRoute, title: 'Международные классификаторы' },
    { to: productClassifiersRoute, title: 'Международный классификатор товаров и услуг' },
    'Список классов'
	],
    { 
      mktuClassList: {
        classes,
        current_page,
        page_count
      },
      waiter
    } = useSelector ( ({ productClassifiers }) => productClassifiers ),
    dispatch = useDispatch(),
    onChangePage = useCallback (
      page => dispatch ( actions.mktuClassListRequest(+page + 1) ),
      [ dispatch ]
    );
 
  useEffect(
    () => {
      if (!classes) {
        dispatch( actions.mktuClassListRequest(1) )
      }
    },
    [ dispatch, classes ]
  );
  
  return (
    <PageWithSideMenu
      className="product-classifiers-classes"
      menu={<ClassifiersSideMenu items={productClassifiersLinks} />}
    >
      <Breadcrumbs crumbs={crumbs} />
      <h4 className="section-title">Список классов</h4>
      <div className="product-classifiers-classes__content">
        {classes && classes.map(({ product_class, text }) => (
          <NavLink 
            key={product_class}
            to={`${productClassifiersClassesRoute}/${product_class}`}
            className="product-classifiers-classes__item"
          >
            <div className='product-classifiers-classes__title'>
              Класс
              {' '}
              {product_class}
            </div>
            <div className='product-classifiers-classes__text'>
              { text }
            </div>
          </NavLink>
        ))}
        <Pagination
          onClick={onChangePage} 
          total={page_count}
          limit={1}
          offset={current_page - 1}
        />
      </div>
      {!!waiter && <Waiter />}
    </PageWithSideMenu>
  );
};
