import React from 'react';
import Drawer from '@material-ui/core/Drawer';

export default React.memo(CustomDrawer);

function CustomDrawer({
  onCancel,
  open,
  children
}) {
	return (
		<Drawer
      className="custom-drawer"
      onClose={onCancel}
      open={open}
      anchor="bottom"
    >
      {children}
		</Drawer>
	);
}
