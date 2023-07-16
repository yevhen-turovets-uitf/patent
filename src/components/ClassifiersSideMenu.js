import React from 'react';
import { LinkOrRoute, SideMenu } from 'components';

export default React.memo(ClassifiersSideMenu);

function ClassifiersSideMenu({ items, closedType }) {
	return (
		<SideMenu>
      {items.map(
        ({ to, text, route, type }) => {
          if (type === closedType) {
            return (
              <div
                key={text}
                className="aside-link disabled"
              >
                <h5>{ text }</h5>
              </div>
            )
          }

          return (
            <LinkOrRoute
              key={text}
              className="aside-link"
              {...{ to, route }}
            >
              <h5>{ text }</h5>
            </LinkOrRoute>
          )
        }
      )}
    </SideMenu>
	);
};
