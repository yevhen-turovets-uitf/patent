import React from 'react';
import clsx from 'clsx';
const arr = [ 'one', 'two', 'three' ];

export default React.memo ( Waiter );

function Waiter ({ className, absolute })
{
	return (
		<div className={ clsx ( 'waiter', !!absolute && 'absolute' ) }>
			<div className={ clsx ( 'cssload-loader', !!className && className ) }>
				{ arr.map ( num => <div key={ num } className={ clsx ( 'cssload-inner', 'cssload-' + num ) } /> ) }
			</div>
		</div>
	);
}
