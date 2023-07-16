import React from 'react';
import Blocks from './Blocks';
const extraProps = { isColumn: true },
	Empty = ({ children }) => children;


export default React.memo ( Row );

function Row ( props )
{
	const Component = props.readOnly ? Empty : 'div';

	return (
		<Component className="row">
			<Blocks { ...props } {...{ extraProps }} />
		</Component>
	);
}
