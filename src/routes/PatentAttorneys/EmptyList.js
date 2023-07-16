import React from 'react';

export default React.memo(EmptyList);

function EmptyList() {
  return (
    <>
      <div className="patent-attorneys__empty-title">По вашему запросу нет результатов</div>
      <div className="patent-attorneys__empty-subtitle">Измените критерии поиска и попробуйте заново</div>
    </>
  );
};
