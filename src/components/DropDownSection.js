import React, { useState } from 'react';
import Collapse from '@material-ui/core/Collapse';

export default React.memo(DropDownSection);

function DropDownSection({ title, isOpen = false, children }) {
  const [open, setOpen] = useState(isOpen);

  return (
    <div className="dropdown-section">
      <div className="dropdown-section__title" onClick={() => setOpen(!open)}>
        <div>{ title }</div>
        <div><i className={open ? "base-icon-up-3" : "base-icon-down-3"}></i></div>
      </div>
      <Collapse
        in={open}
        timeout={ 400 }
      >
        { children }
      </Collapse>
    </div>
	);
}
