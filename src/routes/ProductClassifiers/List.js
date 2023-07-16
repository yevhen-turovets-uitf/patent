import React, { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { SelectInput } from 'components';

export default React.memo(List);

function List({
  products,
  class_filter_list,
  active_class_filter,
  onChangeClassFilter
}) {
  const isMobile = useMediaQuery({
      query: '(max-width: 767px)'
    }),
    isDesktop = useMediaQuery({
      query: '(min-width: 1024px)'
    }),
    [filtersHeight, setFiltersHeight] = useState(0),
    filterContainer = useRef(null);

  useEffect(
    () => {
      setFiltersHeight(filterContainer.current.offsetHeight - 40);
    },
    [ filterContainer, products, class_filter_list, active_class_filter ]
  )

  return (
    <div className="product-classifiers__list">
      <div className="product-classifiers__filters-container" style={isDesktop ? { maxHeight: filtersHeight } : {}}>
        {!isMobile && class_filter_list.map(
          ({ product_class, text}) => (
            <div
              key={product_class}
              className={`product-classifiers__filter ${active_class_filter === product_class ? 'active' : ''}`}
              onClick={() => onChangeClassFilter(product_class)}
            >
              { text }
            </div>
          )
        )}
        {isMobile && (
          <SelectInput
            mobileSize="big"
            placeholder="" 
            options={class_filter_list.map(
              ({ product_class, text}) => ({ label: text, value: product_class })
            )}
            value={active_class_filter}
            onChange={(e) => onChangeClassFilter(e.target.value)}
          />
        )}
      </div>
      <div>
        <div ref={filterContainer} className="product-classifiers__list-inner">
          {!isMobile && (
            <>
              <div className="product-classifiers__list-title">Номер</div>
              <div className="product-classifiers__list-title">Товар/услуга (Rus)</div>
              <div className="product-classifiers__list-title">Товар/услуга (Eng)</div>
              <div className="product-classifiers__list-title">Товар/услуга (Fr)</div>
            </>
          )}
          {products.map(
            ({ number, text_rus, text_eng, text_fr }, index) => (
              <React.Fragment key={number}>
                <div className={`product-classifiers__list-number ${index % 2 !== 0 ? 'product-classifiers__list-number--grey' : ''}`}>
                  {isMobile && <div className="product-classifiers__list-title">Номер</div>}
                  <div>{ number }</div>
                </div>
                <div className={`product-classifiers__list-text ${index % 2 !== 0 ? 'product-classifiers__list-text--grey' : ''}`}>
                  {isMobile && <div className="product-classifiers__list-title">Товар/услуга (Rus)</div>}
                  <div>{ text_rus }</div>
                </div>
                <div className={`product-classifiers__list-text ${index % 2 !== 0 ? 'product-classifiers__list-text--grey' : ''}`}>
                  {isMobile && <div className="product-classifiers__list-title">Товар/услуга (Eng)</div>}
                  <div>{ text_eng }</div>
                </div>
                <div className={`product-classifiers__list-text ${index % 2 !== 0 ? 'product-classifiers__list-text--grey' : ''}`}>
                  {isMobile && <div className="product-classifiers__list-title">Товар/услуга (Fr)</div>}
                  <div>{ text_fr }</div>
                </div>
              </React.Fragment>
            )
          )}
        </div>
      </div>
    </div>
  );
};
