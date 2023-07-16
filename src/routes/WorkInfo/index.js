import React from 'react';
import { openDataRoute } from 'urls';
import {
  PageWithSideMenu,
  Breadcrumbs,
  OpenDataSideMenu
} from 'components';

export default React.memo(WorkInfo);

function WorkInfo() {
  const crumbs = [
    { to: '/', title: 'Онлайн Роспатент' },
    { to: openDataRoute, title: 'Открытые данные' },
    'Информация о делопроизводстве'
  ];
  
  return (
    <PageWithSideMenu
      className="work-info"
      menu={<OpenDataSideMenu />}
    >
      <Breadcrumbs crumbs={crumbs} />
      <h4 className="section-title">Раздел находится в разработке</h4>
      <div className="work-info__content">
        
      </div>
    </PageWithSideMenu>
  );
};
