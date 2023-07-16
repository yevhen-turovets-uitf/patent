import React, { useCallback } from 'react';
import { FileDropzoneField } from 'components';


export default React.memo ( DropzoneSection );

function DropzoneSection ({ id, statementId, sectionId, error, uploadFileRequest })
{
	const onDrop = useCallback (
		([ file ]) => {
			uploadFileRequest ( statementId, id, file, sectionId );
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ statementId, id, sectionId ]
	);

	return (
		<FileDropzoneField {...{ id, error, onDrop }} />
	);
}
