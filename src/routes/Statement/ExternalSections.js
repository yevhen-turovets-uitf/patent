import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ExternalSelect from './ExternalSelect';
import ExternalCard from './ExternalCard';
import { getNormalizedId } from 'functions';


export default React.memo ( ExternalSections );

function ExternalSections ({ statementId, currentSection, normalized, many })
{
	const [ externalSections, setExternalSections ] = useState ( [] ),
		{ blocks, external_sections = [], title, short_title = title, external_sections_error } = currentSection,
		externalWaiter = useSelector ( state => state.statement.externalWaiter );

	useEffect (
		() => setExternalSections (
			blocks.reduce (
				( res, normalizedId ) => {
					const { is_external, external_section_id } = normalized[ normalizedId ] || {};

					if ( is_external ) return [ ...res, getNormalizedId ( external_section_id, 'FILLED_SECTION' ) ];

					return res;
				},
				[]
			)
		),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ blocks ]
	);

	return (
		<React.Fragment>
			<ExternalSelect
				isMulti={ many }
				error={ external_sections_error }
				{...{ statementId, currentSection, normalized, externalWaiter }}
			/>
			{ externalSections.map ( normalizedId => (
				<ExternalCard
					key={ normalizedId }
					defaultTitle={ `${ short_title } ${ external_sections.findIndex ( ({ id }) => getNormalizedId ( id, 'FILLED_SECTION' ) === normalizedId ) + 1 }` }
					{...{ normalizedId, normalized }}
				/>
			) ) }
		</React.Fragment>
	);
}
