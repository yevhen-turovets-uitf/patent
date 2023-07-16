import React from 'react';
import { NavLink } from 'react-router-dom';

export default React.memo(LinkOrRoute);

function LinkOrRoute({ route, to, children, className }) {
  return route
    ? (
      <NavLink {...{ to, className }}>
        { children }
      </NavLink>
    ) : (
      <a className={className} href={to} target="_blank" rel="noreferrer">
        { children }
      </a>
    );
};
