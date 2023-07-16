import React from 'react';
import {
  LinkOrRoute,
  SideMenu
} from 'components';
import {
  officialBulletinsDetailedLinks
} from 'staticData';

export default React.memo(OfficialBulletinsSideMenu);

function OfficialBulletinsSideMenu() {
	return (
    <SideMenu>
      {officialBulletinsDetailedLinks.map(
        ({ to, text, route }) => (
          <LinkOrRoute
            key={text}
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