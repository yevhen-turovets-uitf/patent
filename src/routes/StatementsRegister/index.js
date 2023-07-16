import React from 'react';
import { openDataRoute, openRegistersRoute } from 'urls';
import {
  PageWithSideMenu,
  Breadcrumbs,
  OpenDataSideMenu
} from 'components';

export default React.memo(StatementsRegister);

function StatementsRegister() {
  const crumbs = [
    { to: '/', title: 'Онлайн Роспатент' },
    { to: openDataRoute, title: 'Открытые данные' },
    { to: openRegistersRoute, title: 'Открытые реестры' },
    'Реестр заявлений о государственной регистрации'
  ];
  
  return (
    <PageWithSideMenu
      className="statements-register"
      menu={<OpenDataSideMenu />}
    >
      <Breadcrumbs crumbs={crumbs} />
      <h4 className="section-title">Раздел находится в разработке</h4>
      <div className="statements-register__content">
        
      </div>
    </PageWithSideMenu>
  );
};
