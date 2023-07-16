import React from 'react';


export default React.memo ( HeadingBlock );

function HeadingBlock ({ title, children })
{
	return (
		<div className="heading-block page-title with-link">
			<h1 className="h">{ title }</h1>
			{ children }
		</div>
	);
}
