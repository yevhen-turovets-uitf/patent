import React from 'react';
import { openDataRoute } from 'urls';
import {
  PageWithSideMenu,
  Breadcrumbs,
  OpenDataSideMenu,
  LinkOrRoute
} from 'components';
import { extendedSearchData } from 'staticData';

export default React.memo(ExtendedSearch);

function ExtendedSearch() {
  const crumbs = [
    { to: '/', title: 'Онлайн Роспатент' },
    { to: openDataRoute, title: 'Открытые данные' },
    'Расширенный поиск информации'
  ];
  
  return (
    <PageWithSideMenu
      className="extended-search"
      menu={<OpenDataSideMenu closedType="extended-search"/>}
    >
      <Breadcrumbs crumbs={crumbs} />
      <h4 className="section-title">Расширенный поиск информации</h4>
      <div className="extended-search__content">
        {extendedSearchData.map(
          ({ image, links }) => (
            <div key={links[0].text} className="extended-search__item">
              <div className="extended-search__item-inner">
                {links.map(
                  ({ to, text, route }) => (
                    <div key={text} className="extended-search__link-wrapper">
                      <LinkOrRoute
                        key={text}
                        className="extended-search__link"
                        {...{ to, route }}
                      >
                        { text }
                      </LinkOrRoute>
                    </div>
                  )
                )}
              </div>
              <div className="extended-search__image">
                <img src={image} alt=''/>
              </div>
            </div>
          )
        )}
      </div>
    </PageWithSideMenu>
  );
};
