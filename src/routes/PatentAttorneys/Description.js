import React from 'react';
import { patentAttorneysDescription } from 'staticData';

export default React.memo(Description);

function Description() {
  return (
    <div className="patent-attorneys__description">
      {patentAttorneysDescription.map(
        elem => (
          <p key={elem} className="patent-attorneys__text">{ elem }</p>
        )
      )}
    </div>
  );
};
