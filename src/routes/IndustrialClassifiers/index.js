import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import {
  board,
  deleteFilter
} from 'images';
import { useSelector, useDispatch } from 'react-redux';
import {
  PageWithSideMenu,
  Breadcrumbs,
  ClassifiersSideMenu,
  SearchButton
} from 'components';
import {
  openDataRoute,
  classifiersRoute,
  industrialClassifiersClassListRoute
} from 'urls';
import { industrialClassifiersLinks } from 'staticData';
import actions from 'actions';
import Description from './Description';
import EmptyList from './EmptyList';
import List from './List';

export default React.memo(IndustrialClassifiers);

function IndustrialClassifiers() {
	const crumbs = [
    { to: '/', title: 'Онлайн Роспатент' },
    { to: openDataRoute, title: 'Открытые данные' },
    { to: classifiersRoute, title: 'Международные классификаторы' },
    'Междунарожный классификатор промышленных образцов'
	],
    { 
      mkpoSearchForm: {
        industrial_class,
        industrial_name
      },
      mkpoSearch: {
        list,
        current_page,
        page_count
      }
    } = useSelector ( ({ industrialClassifiers }) => industrialClassifiers ),
    dispatch = useDispatch(),
    onChangeClass = useCallback (
      e => dispatch ( actions.mkpoChangeSearchForm ({ industrial_class: e.target.value })),
      [ dispatch ]
    ),
    onChangeName = useCallback (
      e => dispatch ( actions.mkpoChangeSearchForm ({ industrial_name: e.target.value })),
      [ dispatch ]
    ),
    onClearFilters = useCallback (
			() => dispatch ( actions.mkpoClearSearchForm ()),
			[ dispatch ]
		);

	return (
    <PageWithSideMenu
      className="industrial-classifiers"
      menu={<ClassifiersSideMenu items={industrialClassifiersLinks} />}
    >
      <Breadcrumbs crumbs={crumbs} />
      <h4 className="section-title">Междунарожный классификатор промышленных образцов</h4>
      <div className="industrial-classifiers__fields">
        <div className="industrial-classifiers__fields-item">
          <div className="input-row">
            <label>Класс или группа</label>
            <input 
              className="style1"
              placeholder="Введите номер"
              value={industrial_class}
              onChange={onChangeClass}
            />
          </div>
        </div>
        <div className="industrial-classifiers__fields-item">
          <div className="input-row">
            <label>Название</label>
            <input 
              className="style1"
              placeholder="Введите название"
              value={industrial_name}
              onChange={onChangeName}
            />
          </div>
        </div>
        <div className="industrial-classifiers__fields-item">
          <SearchButton onSearch={() => null} />
        </div>
      </div>
      <div className="industrial-classifiers__control">
        <NavLink to={industrialClassifiersClassListRoute} className="industrial-classifiers__control-item">
          <img src={board} alt=""/>
          <span>Классы и алфавитный указатель</span>
        </NavLink>
        {!!list && (
          <div
            className="industrial-classifiers__control-item"
            onClick={onClearFilters}
          >
            <img src={deleteFilter} alt=""/>
            <span>Очистить фильтры</span>
          </div>
        )}
      </div>
      <div className="industrial-classifiers__content">
        {!list && <Description />}
        {list?.length > 0 && 
          <List 
            {...{
              list,
              current_page,
              page_count
            }}
          />
        }
        {list?.length === 0 && <EmptyList />}
      </div>
    </PageWithSideMenu>
	);
};
