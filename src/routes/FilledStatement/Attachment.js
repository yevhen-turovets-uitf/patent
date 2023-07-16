import React from 'react';
import { useDownload } from 'hooks';
import { FileFormatIcon } from 'components';


export default React.memo ( Attachment );

function Attachment ({ id, name, isReferred })
{
	const [ waiter, download ] = useDownload ( id, name, 'downloadAttachment' );

	if ( !name ) return null;

	if ( isReferred )
	{
		return (
			<a
				href={ `#${ name }`}
				style={ waiter ? { cursor: 'default' } : undefined }
				onClick={ waiter ? undefined : e => {
					e.preventDefault();
					download();
				} }
			>
				<FileFormatIcon fileName={ name } />
				<span>{ name }</span>
			</a>
		);
	}

	return (
		<div
			style={ waiter ? undefined : { cursor: 'pointer' } }
			className="file-row gray-box"
			onClick={ waiter ? undefined : download }
		>
			<FileFormatIcon fileName={ name } />
			<div className="title">{ name }</div>
		</div>
	);
}
