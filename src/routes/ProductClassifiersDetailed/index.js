import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router-dom';
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

export default React.memo(ProductClassifiersDetailed);

function ProductClassifiersDetailed() {
  const { productClass } = useParams(),
    isMobile = useMediaQuery({
      query: '(max-width: 767px)'
    }),
    crumbs = [
      { to: '/', title: 'Онлайн Роспатент' },
      { to: openDataRoute, title: 'Открытые данные' },
      { to: classifiersRoute, title: 'Международные классификаторы' },
      { to: productClassifiersRoute, title: 'Международный классификатор товаров и услуг' },
      { to: productClassifiersClassesRoute, title: 'Список классов' },
      `Класс ${productClass}`
    ],
    { 
      mktuClassDetailed: {
        description_list,
        products,
        current_page,
        page_count
      },
      waiter
    } = useSelector ( ({ productClassifiers }) => productClassifiers ),
    dispatch = useDispatch(),
    onChangePage = useCallback (
      page => {
        dispatch( actions.mktuClassDetailedRequest(productClass, +page + 1) );
      },
      [ dispatch, productClass ]
    );

  useEffect(
    () => {
      dispatch( actions.mktuClassDetailedRequest(productClass, 1) )

      return () => {
        dispatch( actions.mktuClearClassDetailed() )
      }
    },
    [ dispatch, productClass ]
  );
  
  return (
    <PageWithSideMenu
      className="product-classifiers-detailed"
      menu={<ClassifiersSideMenu items={productClassifiersLinks} />}
    >
      <Breadcrumbs crumbs={crumbs} />
      <h4 className="section-title">{`Класс ${productClass}`}</h4>
      <ul className="product-classifiers-detailed__description">
        {description_list && description_list.map(
          elem => <li key={elem} className='product-classifiers-detailed__description-item'>{ elem }</li>
        )}
      </ul>
      <div className="product-classifiers-detailed__list">
        <div className="product-classifiers-detailed__list-inner">
          {!isMobile && (
            <>
              <div className="product-classifiers-detailed__list-title">Номер</div>
              <div className="product-classifiers-detailed__list-title">Товар/услуга (Rus)</div>
              <div className="product-classifiers-detailed__list-title">Товар/услуга (Eng)</div>
              <div className="product-classifiers-detailed__list-title">Товар/услуга (Fr)</div>
            </>
          )}
          {products && products.map(
            ({ number, text_rus, text_eng, text_fr }, index) => (
              <React.Fragment key={number}>
                <div className={`product-classifiers-detailed__list-number ${index % 2 !== 0 ? 'product-classifiers-detailed__list-number--grey' : ''}`}>
                  {isMobile && <div className="product-classifiers-detailed__list-title">Номер</div>}
                  <div>{ number }</div>
                </div>
                <div className={`product-classifiers-detailed__list-text ${index % 2 !== 0 ? 'product-classifiers-detailed__list-text--grey' : ''}`}>
                  {isMobile && <div className="product-classifiers-detailed__list-title">Товар/услуга (Rus)</div>}
                  <div>{ text_rus }</div>
                </div>
                <div className={`product-classifiers-detailed__list-text ${index % 2 !== 0 ? 'product-classifiers-detailed__list-text--grey' : ''}`}>
                  {isMobile && <div className="product-classifiers-detailed__list-title">Товар/услуга (Eng)</div>}
                  <div>{ text_eng }</div>
                </div>
                <div className={`product-classifiers-detailed__list-text ${index % 2 !== 0 ? 'product-classifiers-detailed__list-text--grey' : ''}`}>
                  {isMobile && <div className="product-classifiers-detailed__list-title">Товар/услуга (Fr)</div>}
                  <div>{ text_fr }</div>
                </div>
              </React.Fragment>
            )
          )}
        </div>
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
