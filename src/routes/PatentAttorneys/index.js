/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import validator from 'validator';
import {
  deleteFilter
} from 'images';
import { useSelector, useDispatch } from 'react-redux';
import {
  PageWithSideMenu,
  Breadcrumbs,
  SelectInput,
  Pagination,
  SearchButton,
  Waiter
} from 'components';
import actions from 'actions';
import Description from './Description';
import EmptyList from './EmptyList';
import DropDownList from './DropDownList';

export default React.memo(ProductClassifiers);

const fakeRegionsOptions = [
  { label: 'Самарская область', value: 'Самарская область' },
  { label: 'Московская область', value: 'Московская область' }
];

const fakeSpecializationOptions = [
  { label: 'Товарные знаки и знаки обслуживания', value: 'Товарные знаки и знаки обслуживания' },
  { label: 'Изобретения', value: 'Изобретения' }
];

const fakeLanguageOptions = [
  { label: 'русский', value: 'русский' },
  { label: 'английский', value: 'английский' }
];

function ProductClassifiers() {
	const crumbs = [
    { to: '/', title: 'Онлайн Роспатент' },
    'Патентные поверенные'
	],
    { mainForm: {
        fio,
        registerNumber,
        organizationName,
        region,
        specialization,
        language
      },
      attorneys: {
        result_count,
        current_page,
        page_count,
        list
      },
      waiter
    } = useSelector ( ({ patentAttorneys }) => patentAttorneys ),
    dispatch = useDispatch(),
    [attorneyFio, setAttorneyFio] = useState(fio),
    [attorneyRegisterNumber, setAttorneyRegisterNumber] = useState(registerNumber),
    [attorneyOrganizationName, setAttorneyOrganizationName] = useState(organizationName),
    [attorneyRegion, setAttorneyRegion] = useState(region),
    [attorneySpecialization, setAttorneySpecialization] = useState(specialization),
    [attorneyLanguage, setAttorneyLanguage] = useState(language),
    onChangeFio = useCallback (
      e => {
        setAttorneyFio( e.target.value )
      },
      []
    ),
    onChangeRegisterNumber = useCallback (
      e => {
        setAttorneyRegisterNumber( e.target.value )
      },
      []
    ),
    onChangeOrganizationName = useCallback (
      e => {
        setAttorneyOrganizationName( e.target.value )
      },
      []
    ),
    onChangeRegion = useCallback (
      e => {
        setAttorneyRegion( e.target.value )
      },
      []
    ),
    onChangeSpecialization = useCallback (
      e => {
        setAttorneySpecialization( e.target.value )
      },
      []
    ),
    onChangeLanguage = useCallback (
      e => {
        setAttorneyLanguage( e.target.value )
      },
      []
    ),
    onClearMainForm = useCallback (
      () => {
        setAttorneyFio('');
        setAttorneyRegisterNumber('');
        setAttorneyOrganizationName('');
        setAttorneyRegion('');
        setAttorneySpecialization('');
        setAttorneyLanguage('');
        dispatch ( actions.patentAttorneysClearSearchForm() );
      },
      [ dispatch ]
    ),
    onSearch = useCallback (
      () => {
        const value = {
          fio: attorneyFio,
          registerNumber: attorneyRegisterNumber,
          organizationName: attorneyOrganizationName,
          region: attorneyRegion,
          specialization: attorneySpecialization,
          language: attorneyLanguage
        };

        dispatch( actions.patentAttorneysChangeSearchForm(value) )
        dispatch( actions.patentAttorneysSearchRequest(value) );
      },
      [
        dispatch,
        attorneyFio,
        attorneyRegisterNumber,
        attorneyOrganizationName,
        attorneyRegion,
        attorneySpecialization,
        attorneyLanguage
      ]
    ),
    onChangePage = useCallback (
      page => {
        dispatch ( actions.patentAttorneysSearchRequest({
          fio,
          registerNumber,
          organizationName,
          region,
          specialization,
          language,
          current_page: +page + 1
        }) )
      },
      [
        dispatch,
        fio,
        registerNumber,
        organizationName,
        region,
        specialization,
        language
      ]
    );

  // useEffect(
  //   () => {
  //     if (!mktuClassSelectOptions) {
  //       dispatch( actions.mktuSelectOptionsRequest() )
  //     }
  //   },
  //   [ dispatch, mktuClassSelectOptions ]
  // );

	return (
    <PageWithSideMenu
      className="patent-attorneys"
    >
      <Breadcrumbs crumbs={crumbs} />
      <h4 className="section-title">Патентные поверенные</h4>
      <div className="patent-attorneys__fields">
        <div className="patent-attorneys__fields-item patent-attorneys__fields-item--first">
          <div className="input-row">
            <label>Ф.И.О.</label>
            <input 
              className="style1"
              placeholder="Фамилия, имя и отчество"
              value={attorneyFio}
              onChange={onChangeFio}
            />
          </div>
        </div>
        <div className="patent-attorneys__fields-item patent-attorneys__fields-item--second">
          <div className="input-row">
            <label>Регистрационный номер патентного поверенного</label>
            <input 
              className="style1"
              placeholder="XXXXXXXXXXXXXXX"
              value={attorneyRegisterNumber}
              onChange={onChangeRegisterNumber}
            />
          </div>
        </div>
        <div className="patent-attorneys__fields-item patent-attorneys__fields-item--third">
          <div className="input-row">
            <label>Название организации</label>
            <input 
              className="style1"
              placeholder="Название организации"
              value={attorneyOrganizationName}
              onChange={onChangeOrganizationName}
            />
          </div>
        </div>
        <div className="patent-attorneys__fields-item patent-attorneys__fields-item--fourth">
          <div className="input-row">
            <label>Регион</label>
            <SelectInput
              mobileSize="big"
              placeholder="Регион"
              options={fakeRegionsOptions}
              // options={mktuClassSelectOptions?.map(elem => ({ label: elem, value: elem })) || []}
              value={attorneyRegion}
              onChange={onChangeRegion}
            />
          </div>
        </div>
        <div className="patent-attorneys__fields-item patent-attorneys__fields-item--fifth">
          <div className="input-row">
            <label>Специализация</label>
            <SelectInput
              mobileSize="big"
              placeholder="Специализация"
              options={fakeSpecializationOptions}
              // options={mktuClassSelectOptions?.map(elem => ({ label: elem, value: elem })) || []}
              value={attorneySpecialization}
              onChange={onChangeSpecialization}
            />
          </div>
        </div>
        <div className="patent-attorneys__fields-item patent-attorneys__fields-item--sixth">
          <div className="input-row">
            <label>Язык</label>
            <SelectInput
              mobileSize="big"
              placeholder="Язык"
              options={fakeLanguageOptions}
              // options={mktuClassSelectOptions?.map(elem => ({ label: elem, value: elem })) || []}
              value={attorneyLanguage}
              onChange={onChangeLanguage}
            />
          </div>
        </div>
        <div className="patent-attorneys__fields-item patent-attorneys__fields-item--seventh">
          <SearchButton {...{ onSearch }} />
        </div>
      </div>
      <div className="patent-attorneys__control">
        {!!list && (
          <div
            className="patent-attorneys__control-item"
            onClick={onClearMainForm}
          >
            <img src={deleteFilter} alt=""/>
            <span>Очистить фильтры</span>
          </div>
        )}
      </div>
      <div className="patent-attorneys__content">
        {!list && <Description />}
        {list?.length > 0 && (
          <>
            <div className="patent-attorneys__result">Результаты: { result_count }</div>
            {list && list.map((elem, index) => (
              <DropDownList
                key={elem.attorney_register_number}
                isOpen={index === 0}
                {...{ ...elem }}
              />
            ))}
            <Pagination
              onClick={onChangePage} 
              total={page_count}
              limit={1}
              offset={current_page - 1}
            />
          </>
        )}
        {list?.length === 0 && <EmptyList />}
      </div>
      {/* {!!waiter && <Waiter />} */}
    </PageWithSideMenu>
	);
}
