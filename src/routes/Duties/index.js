import React from 'react';
import { openDataRoute } from 'urls';
import {
  PageWithSideMenu,
  Breadcrumbs,
  OpenDataSideMenu
} from 'components';

export default React.memo(Duties);

function Duties() {
  const crumbs = [
    { to: '/', title: 'Онлайн Роспатент' },
    { to: openDataRoute, title: 'Открытые данные' },
    'Пошлины, начисления'
  ];
  
  return (
    <PageWithSideMenu
      className="duties"
      menu={<OpenDataSideMenu />}
    >
      <Breadcrumbs crumbs={crumbs} />
      <h4 className="section-title">Раздел находиться в разработке</h4>
      <div className="duties__content">
        
      </div>
    </PageWithSideMenu>

  );
};
