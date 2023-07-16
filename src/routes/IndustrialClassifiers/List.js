import React from 'react';
import { NavLink } from 'react-router-dom';
import { industrialClassifiersGroupRoute } from 'urls';

export default React.memo(List);

function List({
  list,
  current_page,
  page_count
}) {
  return (
    <div className="industrial-classifiers__list">
      {list.map(
        ({ title, items }) => (
          <React.Fragment key={title}>
            <div className="industrial-classifiers__title">{ title }</div>
            <div className="industrial-classifiers__list-inner">
              <div className="industrial-classifiers__list-title">Группа</div>
              <div className="industrial-classifiers__list-title">Наименование</div>
              {items.map(
                ({ number, text }, index) => (
                  <React.Fragment key={number}>
                    <NavLink 
                      to={`${industrialClassifiersGroupRoute}/${number}`}
                      className={`industrial-classifiers__list-number ${index % 2 !== 0 ? 'industrial-classifiers__list-number--grey' : ''}`}
                    >
                      <div>{ number }</div>
                    </NavLink>
                    <div className={`industrial-classifiers__list-text ${index % 2 !== 0 ? 'industrial-classifiers__list-text--grey' : ''}`}>
                      <div>{ text }</div>
                    </div>
                  </React.Fragment>
                )
              )}
            </div>
          </React.Fragment>
        )
      )}
    </div>
  );
};
