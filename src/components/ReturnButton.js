import React from 'react';
import { Link } from "react-router-dom";
import clsx from 'clsx';


export default React.memo ( ReturnButton );

function ReturnButton ({ className, title = 'Личный кабинет', to = '/', ...rest })
{
	return (
		<Link className={ clsx ( 'return-button', className || false ) } {...{ to }}>
			<i className="icon base-icon-back" />
			<span className="label">{ title }</span>
		</Link>
	);
}
