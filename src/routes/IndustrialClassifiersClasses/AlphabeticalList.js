/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  openDataRoute,
  classifiersRoute,
  industrialClassifiersRoute,
  industrialClassifiersGroupRoute,
  industrialClassifiersClassListRoute
} from 'urls';
import {
  Breadcrumbs
} from 'components';
import { alphabet } from 'staticData';

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
      mkpoAlphabeticalList: {
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
        <NavLink
          to={industrialClassifiersClassListRoute}
          className="industrial-classifiers-classes__button"
        >
          Список классов
        </NavLink>
        <div className="industrial-classifiers-classes__button active">
          Алфавитный указатель
        </div>
      </div>
      <div className="industrial-classifiers-classes__alphabet">
        {alphabet.map(
          elem => (
            <div
              key={elem}
              className="industrial-classifiers-classes__alphabet-item"
            >
              { elem }
            </div>
          )
        )}
      </div>
      <div className="industrial-classifiers-classes__alphabet-grid">
        {list.map(
          ({ number, text }) => (
            <div
              key={number}
              className="industrial-classifiers-classes__grid-item"
            >
              { text }
              {', '}
              <NavLink 
                to={`${industrialClassifiersGroupRoute}/${number}`}
                className="industrial-classifiers-classes__number"
              >
                { number }
              </NavLink>
            </div>
          )
        )}
      </div>
    </>
  );
};
