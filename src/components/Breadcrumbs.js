import React from 'react';
import { NavLink } from "react-router-dom";


export default React.memo(Breadcrumbs);

function Breadcrumbs({ crumbs }) {
	const arr = crumbs.reduce(
		(acc, item, i) => i === 0 ? [item] : acc.concat('/', item),
		[]
	);

	return (
		<div className="breadcrumbs">
			<div className="wrap">
				{arr.map((val, i) => (val === '/' ?
					<span key={i} className="sep">/</span>
					: typeof val === 'string' ?
						<span key={i}>{val}</span>
						: <NavLink key={i} to={val.to}>{val.title}</NavLink>
				))}
			</div>
		</div>
	);
}
