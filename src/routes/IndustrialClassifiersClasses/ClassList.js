/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  openDataRoute,
  classifiersRoute,
  industrialClassifiersRoute,
  industrialClassifiersAlphabeticalListRoute
} from 'urls';
import {
  Breadcrumbs
} from 'components';
import DropDownList from './DropDownList';

export default React.memo(ClassList);

function ClassList() {
  const crumbs = [
    { to: '/', title: 'Онлайн Роспатент' },
    { to: openDataRoute, title: 'Открытые данные' },
    { to: classifiersRoute, title: 'Международные классификаторы' },
    { to: industrialClassifiersRoute, title: 'Междунарожный классификатор промышленных образцов' },
    'Классы и алфавитный указатель'
	],
    { 
      mkpoClassList: {
        list,
        current_page,
        page_count
      }
    } = useSelector ( ({ industrialClassifiers }) => industrialClassifiers ),
    dispatch = useDispatch();
  
  return (
    <>
      <Breadcrumbs crumbs={crumbs} />
      <h4 className="section-title">Классы и алфавитный указатель</h4>
      <div className="industrial-classifiers-classes__navigation">
        <div className="industrial-classifiers-classes__button active">
          Список классов
        </div>
        <NavLink
          to={industrialClassifiersAlphabeticalListRoute}
          className="industrial-classifiers-classes__button"
        >
          Алфавитный указатель
        </NavLink>
      </div>
      <div className="industrial-classifiers-classes__content">
        {list.map(({ title, description, items }, index) => (
          <DropDownList
            key={title}
            isOpen={index === 0}
            {...{ title, description, items }}
          />
        ))}
      </div>
    </>
  );
};
