import React from 'react';
import { openDataRoute, openRegistersRoute } from 'urls';
import {
  PageWithSideMenu,
  Breadcrumbs,
  OpenDataSideMenu
} from 'components';

export default React.memo(DisputedObjectionsRegister);

function DisputedObjectionsRegister() {
  const crumbs = [
    { to: '/', title: 'Онлайн Роспатент' },
    { to: openDataRoute, title: 'Открытые данные' },
    { to: openRegistersRoute, title: 'Открытые реестры' },
    'Реестр возражений и заявлений'
  ];
  
  return (
    <PageWithSideMenu
      className="disputed-objections-register"
      menu={<OpenDataSideMenu />}
    >
      <Breadcrumbs crumbs={crumbs} />
      <h4 className="section-title">Раздел находится в разработке</h4>
      <div className="disputed-objections-register__content">
        
      </div>
    </PageWithSideMenu>
  );
};
