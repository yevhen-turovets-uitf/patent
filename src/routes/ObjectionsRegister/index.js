import React from 'react';
import { openDataRoute, officialBulletinsRoute } from 'urls';
import {
  PageWithSideMenu,
  Breadcrumbs,
  OpenDataSideMenu
} from 'components';

export default React.memo(ObjectionsRegister);

function ObjectionsRegister() {
  const crumbs = [
    { to: '/', title: 'Онлайн Роспатент' },
    { to: openDataRoute, title: 'Открытые данные' },
    { to: officialBulletinsRoute, title: 'Официальные публикации и бюллетени' },
    'Реестр возражений и заявлений'
  ];
  
  return (
    <PageWithSideMenu
      className="objections-register"
      menu={<OpenDataSideMenu />}
    >
      <Breadcrumbs crumbs={crumbs} />
      <h4 className="section-title">Раздел находится в разработке</h4>
      <div className="objections-register__content">
        
      </div>
    </PageWithSideMenu>
  );
};
