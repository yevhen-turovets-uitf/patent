import React from 'react';
import { industrialClassifiersDescription } from 'staticData';

export default React.memo(Description);

function Description() {
  return (
    <div className="industrial-classifiers__description">
      {industrialClassifiersDescription.map(
        elem => (
          <p key={elem} className="industrial-classifiers__text">{ elem }</p>
        )
      )}
    </div>
  );
};
