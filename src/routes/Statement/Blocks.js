import React from 'react';
import Block from './Block';
import { useSelector } from 'react-redux';
const defaultObj = {};


export default React.memo ( Blocks );

function Blocks ({ blocks, sectionOptions, extraProps, readOnly, sectionId, isAttachment, sortByExternal })
{
	const normalized = useSelector ( st => sortByExternal ? st.statement.normalized : defaultObj );

	if ( sortByExternal )
	{
		blocks = blocks.slice().sort (
			( a, b ) => + !( normalized[ b ] || {} ).is_external - !( normalized[ a ] || {} ).is_external
		);
	}

	return blocks.map ( ( normalizedId, i, arr ) => (
		<Block
			key={ normalizedId }
			single={ !sortByExternal && arr.length === 1 }
			last={ i === arr.length - 1 }
			{...{ i, normalizedId, sectionOptions, readOnly, sectionId, isAttachment }}
			{ ...extraProps }
		/>
	) );
}
