import React from 'react';
import { openDataRoute } from 'urls';
import {
  PageWithSideMenu,
  Breadcrumbs,
  OpenDataSideMenu
} from 'components';

export default React.memo(ChamberInfo);

function ChamberInfo() {
  const crumbs = [
    { to: '/', title: 'Онлайн Роспатент' },
    { to: openDataRoute, title: 'Открытые данные' },
    'Информация палаты по патентным спорам'
  ];
  
  return (
    <PageWithSideMenu
      className="chamber-info"
      menu={<OpenDataSideMenu />}
    >
      <Breadcrumbs crumbs={crumbs} />
      <h4 className="section-title">Раздел находится в разработке</h4>
      <div className="chamber-info__content">
        
      </div>
    </PageWithSideMenu>
  );
};
