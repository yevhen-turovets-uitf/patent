import React from 'react';
import { useSelector } from 'react-redux';
import {
  openDataRoute,
  classifiersRoute,
  industrialClassifiersRoute
} from 'urls';
import {
  PageWithSideMenu,
  Breadcrumbs,
  ClassifiersSideMenu
} from 'components';
import { useParams } from 'react-router-dom';
import { industrialClassifiersLinks } from 'staticData';

export default React.memo(IndustrialClassifiersDetailed);

function IndustrialClassifiersDetailed() {
  const { group } = useParams(),
    crumbs = [
      { to: '/', title: 'Онлайн Роспатент' },
      { to: openDataRoute, title: 'Открытые данные' },
      { to: classifiersRoute, title: 'Международные классификаторы' },
      { to: industrialClassifiersRoute, title: 'Междунарожный классификатор промышленных образцов' },
      `Группа ${group}`
    ],
    { 
      mkpoClassDetailed: {
        title,
        notes,
        tags
      }
    } = useSelector ( ({ industrialClassifiers }) => industrialClassifiers );
  
  return (
    <PageWithSideMenu
      className="industrial-classifiers-detailed"
      menu={<ClassifiersSideMenu items={industrialClassifiersLinks} />}
    >
      <Breadcrumbs crumbs={crumbs} />
      <h4 className="section-title">{`Группа ${ group }. ${ title }`}</h4>
      <ol className="industrial-classifiers-detailed__list">
        <div className="industrial-classifiers-detailed__list-title">Примечания:</div>
        {notes.map(
          elem => (
            <li key={elem} className="industrial-classifiers-detailed__list-item">{ elem }</li>
          )
        )}
      </ol>
      {tags.map(
        elem => (
          <div key={elem} className="industrial-classifiers-detailed__list-item">{ elem }</div>
        )
      )}
    </PageWithSideMenu>
  );
};
