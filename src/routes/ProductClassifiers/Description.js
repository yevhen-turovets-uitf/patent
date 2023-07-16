import React from 'react';
import { productClassifiersDescription } from 'staticData';

export default React.memo(Description);

function Description() {
  const { title, subtitle, paragraphs } = productClassifiersDescription;

  return (
    <div className="product-classifiers__description">
      <div className="product-classifiers__title">{ title }</div>
      <div className="product-classifiers__subtitle">{ subtitle }</div>
      {paragraphs.map(
        elem => (
          <p key={elem} className="product-classifiers__text">{ elem }</p>
        )
      )}
    </div>
  );
};
