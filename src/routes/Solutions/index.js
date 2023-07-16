import React from 'react';
import { openDataRoute, officialBulletinsRoute } from 'urls';
import {
  PageWithSideMenu,
  Breadcrumbs,
  OpenDataSideMenu
} from 'components';

export default React.memo(Solutions);

function Solutions() {
  const crumbs = [
    { to: '/', title: 'Онлайн Роспатент' },
    { to: openDataRoute, title: 'Открытые данные' },
    { to: officialBulletinsRoute, title: 'Официальные публикации и бюллетени' },
    'Решения'
  ];
  
  return (
    <PageWithSideMenu
      className="solutions"
      menu={<OpenDataSideMenu />}
    >
      <Breadcrumbs crumbs={crumbs} />
      <h4 className="section-title">Раздел находится в разработке</h4>
      <div className="solutions__content">
        
      </div>
    </PageWithSideMenu>
  );
};
