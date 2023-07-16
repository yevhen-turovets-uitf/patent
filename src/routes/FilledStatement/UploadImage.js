/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone'
import { FieldWrapper } from 'components';
import api from 'api';
const activeAreaStyle = { border: '1px solid #0039A6' },
	errorAreaStyle = { border: '1px solid #FF6666' };


export default React.memo ( UploadImage );

function UploadImage ({ id })
{
	const [ error, setError ] = useState ( false ),
		onDrop = useCallback (
		([ file ]) => {
			setError ( false );

			api.web.setStatementImage ( id, file )
				.then ( ({ error }) => {
					if ( error ) throw error;

					alert ( 'Картинка была успешно загружена' );
				} )
				.catch ( ({ message }) => setError ( message ) );
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ id, setError ]
	),
	{ getRootProps, getInputProps, isDragActive } = useDropzone ({ onDrop });

	return (
		<FieldWrapper noLabel {...{ error }}>
			<div { ...getRootProps ({ className: 'featured-image-upload', style: ( isDragActive ? activeAreaStyle : error ? errorAreaStyle : undefined ) }) }>
				<i className="base-icon-image-add"></i>
				<input { ...getInputProps() } />
				<h5>Добавить изображение<br />пиктограммы</h5>
			</div>
		</FieldWrapper>
	);
}
