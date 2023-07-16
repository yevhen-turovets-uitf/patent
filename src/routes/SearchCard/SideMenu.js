import React from 'react';
import { useSelector } from 'react-redux';
import { LinkOrRoute } from 'components';
import { searchCardLinks } from 'staticData';

export default React.memo(SideMenu);

function SideMenu({ onGenerateReport }) {
  const auth = useSelector ( ({ auth }) => auth );

	return (
		<>
      {searchCardLinks.map(
        ({ to, text, image, route }, index) => {
          if (index === searchCardLinks.length - 1 && !auth) {
            return null;
          }

          if (index === searchCardLinks.length - 1 && auth) {
            return (
              <div
                key={text}
                className="search-card__aside-link"
                onClick={onGenerateReport}
              >
                <img className="search-card__link-image" src={image} alt="" />
                <span className="search-card__link-text">{ text }</span>
              </div>
            )
          }

          return (
            <LinkOrRoute
              key={text}
              className="search-card__aside-link"
              {...{ to, route }}
            >
              <img className="search-card__link-image" src={image} alt="" />
              <span className="search-card__link-text">{ text }</span>
            </LinkOrRoute>
          )}
      )}
    </>
	);
};
