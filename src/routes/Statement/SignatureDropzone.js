import React, { useCallback } from 'react';
import { SignatureCard, FileDropzoneField } from 'components';


export default React.memo ( SignatureDropzone );

function SignatureDropzone ({ id, label, value, placeholder, error, editField, sectionOptions })
{
	const onRemove = useCallback (
			() => window.confirm ( 'Вы действительно хотите удалить файл ЭП?' ) && editField ( '' ),
			[ editField ]
		),
		onDrop = useCallback (
			([ file ]) => editField ( file ),
			[ editField ]
		);

	if ( !error && value ) return <SignatureCard title={ value } {...{ onRemove }} />;

	if ( !!sectionOptions.isElectronicSignature ) {
		return <FileDropzoneField {...{
			id,
			error,
			onDrop,
			text: 'Перетащите сюда файл электронной подписи, сформированный на Шаге 2 или '
		}} />
	}

	return <FileDropzoneField {...{ id, error, onDrop }} />
}
