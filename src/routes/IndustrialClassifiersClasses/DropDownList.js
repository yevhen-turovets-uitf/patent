import React from 'react';
import { NavLink } from 'react-router-dom';
import { DropDownSection } from 'components';
import { industrialClassifiersGroupRoute } from 'urls';

export default React.memo(DropDownList);

function DropDownList({ title, description, items, isOpen }) {
  return (
    <DropDownSection {...{ title, isOpen }}>
      <div className="industrial-classifiers-classes__list-description">{ description }</div>
      <div className="industrial-classifiers-classes__list-inner">
        {items.map(
          ({ number, text }, index) => (
            <React.Fragment key={number}>
              <NavLink 
                to={`${industrialClassifiersGroupRoute}/${number}`}
                className={`industrial-classifiers-classes__list-number ${index % 2 !== 0 ? 'industrial-classifiers-classes__list-number--grey' : ''}`}
              >
                <div>{ number }</div>
              </NavLink>
              <div className={`industrial-classifiers-classes__list-text ${index % 2 !== 0 ? 'industrial-classifiers-classes__list-text--grey' : ''}`}>
                <div>{ text }</div>
              </div>
            </React.Fragment>
          )
        )}
      </div>
    </DropDownSection>
	);
}
