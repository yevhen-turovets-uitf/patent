import React from 'react';
import Collapse from '@material-ui/core/Collapse';


export default React.memo ( Tab );

function Tab ({ classes, isOpen, children })
{
	return (
		<Collapse in={ isOpen } timeout={ 400 }>
			{ children }
		</Collapse>
	);
}
