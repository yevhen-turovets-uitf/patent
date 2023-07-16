import React from 'react';

export default React.memo(PageWithSideMenu);

function PageWithSideMenu({ children, menu, className = '' }) {
  return (
    <main className={`page-with-side-menu ${className}`}>
      <div className="container">
        <div className="page-with-side-menu__container">
          <div className="page-with-side-menu__aside">
            { children }
          </div>
          { menu }
        </div>
      </div>
    </main>
  );
};
