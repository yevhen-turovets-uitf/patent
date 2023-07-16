/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { FieldWrapper } from 'components';
const activeAreaStyle = { borderColor: '#0039A6' },
	errorAreaStyle = { borderColor: '#FF6666' };


export default React.memo ( FileDropzoneField );

function FileDropzoneField ({
	id,
	error,
	text = 'Чтобы добавить приложение, перетащите сюда файл или ',
	linkText = 'выберите на компьютере',
	onDrop
})
{
	const { getRootProps, getInputProps, isDragActive } = useDropzone ({ onDrop });

	return (
		<FieldWrapper noLabel {...{ id, error }}>
			<div { ...getRootProps ({ className: 'add-file-area', style: ( isDragActive ? activeAreaStyle : error ? errorAreaStyle : undefined ) }) }>
				<input { ...getInputProps() } />
				<div className="wrap">
					<i className="base-icon-file-add"></i>
					<div className="text">
						{ text }
						<a>{ linkText }</a>
					</div>
				</div>
			</div>
		</FieldWrapper>
	);
}
