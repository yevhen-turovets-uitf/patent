/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import filesize from 'filesize';
import {
  openDataRoute,
  classifiersRoute,
  industrialClassifiersRoute,
  industrialClassifiersVersionsRoute
} from 'urls';
import {
  PageWithSideMenu,
  Breadcrumbs,
  ClassifiersSideMenu
} from 'components';
import {
  industrialClassifiersLinks
} from 'staticData';

export default React.memo(IndustrialClassifiersVersions);

function IndustrialClassifiersVersions() {
  const crumbs = [
    { to: '/', title: 'Онлайн Роспатент' },
    { to: openDataRoute, title: 'Открытые данные' },
    { to: classifiersRoute, title: 'Международные классификаторы' },
    { to: industrialClassifiersRoute, title: 'Междунарожный классификатор промышленных образцов' },
    'Версии Международной классификации промышленных образцов'
	],
    { 
      mkpoVersions: {
        files,
        all_files
      }
    } = useSelector ( ({ industrialClassifiers }) => industrialClassifiers ),
    dispatch = useDispatch();
  
  return (
    <PageWithSideMenu
      className="industrial-classifiers-versions"
      menu={
        <ClassifiersSideMenu
          items={industrialClassifiersLinks}
          closedType={industrialClassifiersVersionsRoute}
        />
      }
    >
      <Breadcrumbs crumbs={crumbs} />
      <h4 className="section-title">Версии Международной классификации промышленных образцов</h4>
      <div className="industrial-classifiers-versions__content">
        {files.map(
          ({ link, text, weight }) => (
            <div key={text} className="industrial-classifiers-versions__link-wrapper">
              <a
                key={text}
                href={link}
                className="industrial-classifiers-versions__link"
                download
              >
                { text }
              </a>
              <span className="industrial-classifiers-versions__weight">
                {', '}
                { filesize(weight) }
              </span>
            </div>
          )
        )}
      </div>
      <a
        className="industrial-classifiers-versions__all-files"
        href={all_files}
        download
      >
        <i className="base-icon-down-2 mr2"></i>
        Скачать одним архивом
      </a>
    </PageWithSideMenu>
  );
};
