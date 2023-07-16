import React from 'react';
import { openDataRoute, officialBulletinsRoute } from 'urls';
import {
  PageWithSideMenu,
  Breadcrumbs,
  OpenDataSideMenu
} from 'components';

export default React.memo(Objections);

function Objections() {
  const crumbs = [
    { to: '/', title: 'Онлайн Роспатент' },
    { to: openDataRoute, title: 'Открытые данные' },
    { to: officialBulletinsRoute, title: 'Официальные публикации и бюллетени' },
    'Возражения и заявления'
  ];
  
  return (
    <PageWithSideMenu
      className="objections"
      menu={<OpenDataSideMenu />}
    >
      <Breadcrumbs crumbs={crumbs} />
      <h4 className="section-title">Раздел находится в разработке</h4>
      <div className="objections__content">
        
      </div>
    </PageWithSideMenu>
  );
};
