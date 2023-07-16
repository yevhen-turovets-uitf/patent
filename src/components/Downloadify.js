import React from 'react';
import { useDownload } from 'hooks';


export default React.memo ( Downloadify );

function Downloadify ({ id, name, children })
{
	const [ waiter, download ] = useDownload ( id, name + '.pdf' );

	return React.Children.map (
		children,
		child => (
			React.cloneElement (
				child,
				{ onClick: ( waiter ? undefined : download ) }
			)
		)
	);
}
