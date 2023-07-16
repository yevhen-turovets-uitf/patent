import React from 'react';
import { FieldWrapper, SelectInput } from 'components';


export default React.memo ( SelectField );

function SelectField ({ className, id, label, required, placeholder = label, error, ...rest })
{
	return (
		<FieldWrapper {...{ className, id, label, required, error }}>
			<SelectInput {...{ placeholder, error }} { ...rest } />
		</FieldWrapper>
	);
}
