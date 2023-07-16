import React from 'react';
import Field from './Field';
import Row from './Row';
import Blocks from './Blocks';
import Switch from './Switch';
import Checkbox from './Checkbox';
import FilledSection from './FilledSection';
import { useSelector } from 'react-redux';
const components = {
	CONTAINER: Blocks,
	SECTION: Blocks,
	FILLED_SECTION: FilledSection,
	FIELD: Field,
	TEXT: Field,
	TEXT_AREA: Field,
	DATE: Field,
	DATE_TIME: Field,
	FILE: Field,
	DIGITAL_SIGNATURE: Field,
	CHECK_BOX: Checkbox,
	ROW: Row,
	SWITCH: Switch,
	COUNTRY_SWITCH: Switch,
	RADIO: Switch
};


export default React.memo ( Block );

function Block ({ normalizedId, forcedType, sectionOptions, ...rest })
{
	const data = useSelector ( st => st.statement.normalized[ normalizedId ] ),
		{ type } = data || {},
		Component = components[ forcedType || type ],
		props = { ...data, ...rest, sectionOptions };

	if ( !Component ) return null;

	return <Component { ...props } />;
}
