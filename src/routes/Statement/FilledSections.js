import React, { useMemo } from 'react';
import FilledSection from './FilledSection';


export default React.memo ( FilledSections );

function FilledSections ({ id: sectionId, title, short_title, filled_sections, sectionOptions, normalized, removeStatementSectionRequest })
{
	const filled = useMemo (
		() => ( filled_sections || [] ).length < 2 ? [] : filled_sections.slice ( 0, filled_sections.length - 1 ),
		[ filled_sections ]
	);

	return (
		<div className="lc-added-boxs">
			{ filled.map ( ( { id }, i ) => (
				<FilledSection
					key={ id }
					title={ `${ short_title || title } ${ i + 1 }` }
					{...{ sectionId, id, sectionOptions, normalized, removeStatementSectionRequest }}
				/>
			) ) }
		</div>
	);
}
