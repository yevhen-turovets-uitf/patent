import React from 'react';
import { openDataRoute } from 'urls';
import {
  PageWithSideMenu,
  Breadcrumbs,
  OpenDataSideMenu
} from 'components';
import { openApiLinks } from 'staticData';

export default React.memo(OpenApi);

function OpenApi() {
  const crumbs = [
    { to: '/', title: 'Онлайн Роспатент' },
    { to: openDataRoute, title: 'Открытые данные' },
    'Открытые API'
  ];
  
  return (
    <PageWithSideMenu
      className="open-api"
      menu={<OpenDataSideMenu closedType="open-api"/>}
    >
      <Breadcrumbs crumbs={crumbs} />
      <h4 className="section-title">Открытые API</h4>
      <div className="open-api__content">
        {openApiLinks.map(({ to, text }) => (
          <div key={text} className="open-api__item">
            <div className="open-api__title">{ text }</div>
            <a className="open-api__download" href={ to } download>
              <i className="base-icon-down-2 mr2"></i>
              Скачать
            </a>
          </div>
        ))}
      </div>
    </PageWithSideMenu>
  );
};
