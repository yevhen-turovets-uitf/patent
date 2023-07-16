import React from 'react';
import { LinkOrRoute, SideMenu } from 'components';
import { openDataMainLinks } from 'staticData';

export default React.memo(OpenDataSideMenu);

function OpenDataSideMenu({ closedType }) {
  return (
    <SideMenu>
      {openDataMainLinks
        .filter(({ type }) => type !== closedType)
        .map(({ to, text, type, route }) => (
          <LinkOrRoute
            key={type}
            className="aside-link"
            {...{ to, route }}
          >
            <h5>{ text }</h5>
          </LinkOrRoute>
        )
      )}
    </SideMenu>
  );
};
