import React from 'react';


export default React.memo ( Page );

function Page ({ location, ...other })
{
	return (
		<div>
			<h1>{ location.pathname }</h1>
			<pre>
				{ JSON.stringify ( { ...other, location }, null, 4 ) }
			</pre>
		</div>
	);
}
