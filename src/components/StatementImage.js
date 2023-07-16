import React, { useState, useEffect } from 'react';
import { Waiter } from 'components';
import { useRequest } from 'hooks';
const style = { position: 'relative', overflow: 'hidden', minHeight: 100 };


export default React.memo ( StatementImage );

function StatementImage ({ id })
{
	const [ src, setSrc ] = useState ( false ),
		[ { result: blob }, waiter ] = useRequest ( 'getStatementImage', id, true );

	useEffect (
		() => {
			if ( blob )
			{
				const reader = new FileReader();
				reader.readAsDataURL ( blob ); 
				reader.onloadend = () => setSrc ( reader.result );
			}
		},
		[ blob ]
	);

	if ( !waiter && !src ) return null;

	return (
		<div className="image" style={ waiter ? style : undefined }>
			{ src &&
				<img alt="" {...{ src }} />
			}
			{ waiter &&
				<Waiter />
			}
		</div>
	);
}
