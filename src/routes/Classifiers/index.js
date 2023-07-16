import React from 'react';
import { openDataRoute } from 'urls';
import {
  PageWithSideMenu,
  Breadcrumbs,
  OpenDataSideMenu,
  LinkOrRoute
} from 'components';
import { classifiersLinksData } from 'staticData';

export default React.memo(Classifiers);

function Classifiers() {
  const crumbs = [
    { to: '/', title: 'Онлайн Роспатент' },
    { to: openDataRoute, title: 'Открытые данные' },
    'Международные классификаторы'
  ];
  
  return (
    <PageWithSideMenu
      className="classifiers"
      menu={<OpenDataSideMenu closedType="classifiers"/>}
    >
      <Breadcrumbs crumbs={crumbs} />
      <h4 className="section-title">Международные классификаторы</h4>
      <div className="classifiers__content">
        {classifiersLinksData.map(
          ({ image, link: { text, to, route } }) => (
            <LinkOrRoute
              key={text}
              className="classifiers__item"
              {...{ to, route }}
            >
              <div className="classifiers__link">
                { text }
              </div>
              <div className="classifiers__image">
                <img src={image} alt=''/>
              </div>
            </LinkOrRoute>
          )
        )}
      </div>
    </PageWithSideMenu>
  );
};
