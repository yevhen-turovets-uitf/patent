import React from 'react';
import { FileFormatIcon } from 'components';


export default React.memo ( FilledSectionRow );

function FilledSectionRow ({ title, value, isAttachment })
{
	if ( typeof value === 'boolean' )
	{
		value = value ? 'Да' : 'Нет';
	}
	else if ( !value ) return null;

	if ( isAttachment ) return (
		<React.Fragment>
			<FileFormatIcon fileName={ value } />
			<div className="title">{ value }</div>
		</React.Fragment>
	);

	return (
		<li>{ `${ title } - ${ String ( value ) }` }</li>
	);
}
