import React, { useCallback } from 'react';
import { FileFormatIcon, FileDropzoneField } from 'components';


export default React.memo ( FileField );

function FileField ({ id, value, error, editField })
{
	const onDrop = useCallback (
			([ file ]) => {
				editField ( file );
			},
			[ editField ]
		),
		onClick = useCallback (
			() => editField ( '' ),
			[ editField ]
		);

	if ( value ) return (
		<div className="file-row with-inputs gray-box">
			<FileFormatIcon fileName={ value } />
			<div className="title">{ value }</div>
			<div className="delete base-icon-delete" {...{ onClick }} />
		</div>
	);

	return (
		<FileDropzoneField {...{ id, error, onDrop }} />
	);
}
