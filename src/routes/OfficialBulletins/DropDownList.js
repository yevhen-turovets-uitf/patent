import React, { useState } from 'react';
import { LinkOrRoute } from 'components';
import Collapse from '@material-ui/core/Collapse';

export default React.memo(DropDownList);

function DropDownList({ title, links }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`official-bulletins__dropdown-container ${open ? 'active' : ''}`}
      onClick={() => setOpen(true)}
    >
      <Collapse
        in={!open}
        timeout={ 400 }
      >
        <div className="official-bulletins__dropdown-title">
          { title }
        </div>
      </Collapse>
      <Collapse
        in={open}
        timeout={ 400 }
      >
        <div className="official-bulletins__dropdown-list">
          {links.map(
            ({ to, text, route }) => (
              <LinkOrRoute
                key={text}
                className="official-bulletins__dropdown-item"
                {...{ to, route }}
              >
                { text }
              </LinkOrRoute>
            )
          )}
        </div>
      </Collapse>
    </div>
	);
}
