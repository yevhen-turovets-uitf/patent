import React from 'react';

export default React.memo(EmptyList);

function EmptyList() {
  return (
    <>
      <div className="product-classifiers__empty-title">По вашему запросу нет результатов</div>
      <div className="product-classifiers__empty-subtitle">Измените критерии поиска и попробуйте заново</div>
    </>
  );
};
