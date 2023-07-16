import React from 'react';

export default React.memo(SideMenu);

function SideMenu({ children }) {
	return (
		<div className="side-menu">
      { children }
    </div>
	);
};
