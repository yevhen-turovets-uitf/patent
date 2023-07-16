import React, { useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import validator from 'validator';
import {
  board,
  deleteFilter
} from 'images';
import { useSelector, useDispatch } from 'react-redux';
import {
  PageWithSideMenu,
  Breadcrumbs,
  SelectInput,
  ClassifiersSideMenu,
  Pagination,
  SearchButton,
  Waiter
} from 'components';
import {
  openDataRoute,
  classifiersRoute,
  productClassifiersClassesRoute
} from 'urls';
import { productClassifiersLinks } from 'staticData';
import actions from 'actions';
import Description from './Description';
import EmptyList from './EmptyList';
import List from './List';

export default React.memo(ProductClassifiers);

function ProductClassifiers() {
	const crumbs = [
    { to: '/', title: 'Онлайн Роспатент' },
    { to: openDataRoute, title: 'Открытые данные' },
    { to: classifiersRoute, title: 'Международные классификаторы' },
    'Междунарожный классификатор товаров и услуг'
	],
    { 
      mktuClassSelectOptions,
      mktuSearchForm: {
        product_class,
        product_number,
        product_name
      },
      mktuSearch: {
        products,
        class_filter_list,
        active_class_filter,
        current_page,
        page_count,
        product_count
      },
      waiter
    } = useSelector ( ({ productClassifiers }) => productClassifiers ),
    dispatch = useDispatch(),
    [productClass, setProductClass] = useState(product_class),
    [productNumber, setProductNumber] = useState(product_number),
    [productName, setProductName] = useState(product_name),
    onChangeClass = useCallback (
      e => {
        setProductClass( e.target.value )
      },
      []
    ),
    onChangeNumber = useCallback (
      e => {
        if(validator.isNumeric(e.target.value, { no_symbols: true }) || e.target.value === '') {
          setProductNumber( e.target.value );
        }
      },
      []
    ),
    onChangeName = useCallback (
      e => {
        setProductName( e.target.value )
      },
      []
    ),
    onClearFilters = useCallback (
      () => {
        setProductClass('');
        setProductNumber('');
        setProductName('');
        dispatch ( actions.mktuClearSearchForm() );
      },
      [ dispatch ]
    ),
    onSearch = useCallback (
      () => {
        const value = {
          product_class: productClass,
          product_number: productNumber,
          product_name: productName,
          current_page: 1
        };

        dispatch( actions.mktuChangeSearchForm(value) )
        dispatch( actions.mktuSearchRequest(value) );
      },
      [ dispatch, productClass, productName, productNumber ]
    ),
    onChangeClassFilter = useCallback (
      classFilter => {
        dispatch ( actions.mktuSearchRequest({
          product_class,
          product_number,
          product_name,
          class_filter: classFilter,
          current_page: 1
        }) )
      },
      [ dispatch, product_class, product_name, product_number ]
    ),
    onChangePage = useCallback (
      page => {
        dispatch ( actions.mktuSearchRequest({
          product_class,
          product_number,
          product_name,
          class_filter: active_class_filter,
          current_page: +page + 1
        }) )
      },
      [ dispatch, product_class, product_name, product_number, active_class_filter ]
    );

  useEffect(
    () => {
      if (!mktuClassSelectOptions) {
        dispatch( actions.mktuSelectOptionsRequest() )
      }
    },
    [ dispatch, mktuClassSelectOptions ]
  );

	return (
    <PageWithSideMenu
      className="product-classifiers"
      menu={<ClassifiersSideMenu items={productClassifiersLinks}/>}
    >
      <Breadcrumbs crumbs={crumbs} />
      <h4 className="section-title">Междунарожный классификатор товаров и услуг</h4>
      <div className="product-classifiers__fields">
        <div className="product-classifiers__fields-item product-classifiers__fields-item--first">
          <div className="input-row">
            <label>Класс объекта</label>
            <SelectInput
              isClearable
              isSearchable
              mobileSize="big"
              placeholder=""
              options={mktuClassSelectOptions?.map(elem => ({ label: elem, value: elem })) || []}
              value={productClass}
              onChange={onChangeClass}
            />
          </div>
        </div>
        <div className="product-classifiers__fields-item product-classifiers__fields-item--second">
          <div className="input-row">
            <label>Номер товара или услуги</label>
            <input 
              className="style1"
              placeholder="Введите номер"
              value={productNumber}
              onChange={onChangeNumber}
            />
          </div>
        </div>
        <div className="product-classifiers__fields-item product-classifiers__fields-item--third">
          <div className="input-row">
            <label>Название</label>
            <input 
              className="style1"
              placeholder="Введите название"
              value={productName}
              onChange={onChangeName}
            />
          </div>
        </div>
        <div className="product-classifiers__fields-item product-classifiers__fields-item--fourth">
          <SearchButton {...{ onSearch }} />
        </div>
      </div>
      <div className="product-classifiers__control">
        <NavLink to={productClassifiersClassesRoute} className="product-classifiers__control-item">
          <img src={board} alt=""/>
          <span>Список классов</span>
        </NavLink>
        {!!products && (
          <div
            className="product-classifiers__control-item"
            onClick={onClearFilters}
          >
            <img src={deleteFilter} alt=""/>
            <span>Очистить фильтры</span>
          </div>
        )}
      </div>
      <div className="product-classifiers__content">
        {!products && <Description />}
        {products?.length > 0 && (
          <>
            <div className="product-classifiers__result">Результаты: { product_count }</div>
            <List
              {...{
                products,
                class_filter_list,
                active_class_filter,
                onChangeClassFilter
              }}
            />
            <Pagination
              onClick={onChangePage} 
              total={page_count}
              limit={1}
              offset={current_page - 1}
            />
          </>
        )}
        {products?.length === 0 && <EmptyList />}
      </div>
      {!!waiter && <Waiter />}
    </PageWithSideMenu>
	);
}
