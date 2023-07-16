import React, { useMemo, useEffect, useCallback } from 'react';
import FilledSectionRow from './FilledSectionRow';
import Checkbox from './Checkbox';
import Signature from './Signature';
import DropzoneSection from './DropzoneSection';
import SignatureDropzone from './SignatureDropzone';
import Block from './Block';
import { SignatureCard, TextField, PhoneField, FileField } from 'components';
import { useDispatch, useSelector } from 'react-redux'; 
import { getNormalizedId } from 'functions';
import { useField } from 'hooks';
import actions from 'actions';
import clsx from 'clsx';


export default React.memo ( Field );

function Field ({
	id,
	type,
	title: label,
	placeholder,
	mask,
	value: initialValue,
	required,
	isColumn,
	statement,
	readOnly,
	sectionOptions,
	sectionId,
	focused
})
{
	const dispatch = useDispatch(),
		normalizedId = useMemo (
			() => getNormalizedId ( id, type ),
			[ id, type ]
		),
		field = useSelector ( st => st.statement.normalized[ normalizedId ] ),
		statementId = useSelector ( st => st.statement.id ),
		{ value: normalizedValue, error = false } = field,
		[ value, onChange, setValue  ] = useField ( initialValue ),
		editFieldRequest = useCallback (
			( statementId, id, value, normalizedId ) => dispatch (
				actions.editFieldRequest ( statementId, id, value, normalizedId )
			),
			[ dispatch ]
		),
		fieldOnFocus = useCallback (
			normalizedId => dispatch (
				actions.fieldOnFocus ( normalizedId )
			),
			[ dispatch ]
		),
		uploadFileRequest = useCallback (
			( statementId, id, value, sectionId ) => dispatch (
				actions.uploadFileRequest ( statementId, id, value, sectionId )
			),
			[ dispatch ]
		),
		editField = useCallback (
			value => editFieldRequest ( statementId, id, value, normalizedId ),
			[ statementId, id, normalizedId, editFieldRequest ]
		),
		onBlur = useCallback (
			e => editField ( e.target.value ),
			[ editField ]
		),
		onCheckboxChange = useCallback (
			e => {
				const value = e.target.value === 'true';

				editField ( value );
				setValue ( value );
			},
			[ editField, setValue ]
		),
		onFocus = useCallback (
			() => {
				fieldOnFocus ( normalizedId );
			},
			[ normalizedId, fieldOnFocus ]
		);

	useEffect (
		() => {
			setValue ( normalizedValue || '' );
		},
		[ setValue, normalizedValue ]
	);

	if ( readOnly )
	{
		if ( type === 'DIGITAL_SIGNATURE' ) return (
			<SignatureCard
				title={ value }
				onRemove={ () => editField ( '' ) }
			/>
		);

		return (
			<React.Fragment>
				<FilledSectionRow
					title={ label }
					isAttachment={ sectionOptions.isAttachment }
					{...{ value }}
				/>
				{ type === 'FILE' &&
					<Block
						forcedType="CONTAINER"
						{...{ normalizedId, sectionId, sectionOptions }}
					/>
				}
			</React.Fragment>
		);
	}
	else if ( type === 'CHECK_BOX' )
	{
		return <Checkbox onChange={ onCheckboxChange } {...{ id, label, value, error }} />;
	}
	else if ( type === 'FILE' )
	{
		if ( !sectionOptions.isAttachment ) return (
			<FileField {...{ id, value, error, editField }} />
		);

		return (
			<DropzoneSection
				{...{ statementId, id, sectionId, error, uploadFileRequest }}
			/>
		);
	}
	else if ( type === 'DIGITAL_SIGNATURE' )
	{
		if ( sectionOptions.isThirdPartySignature ) return (
			<DropzoneSection
				{...{ statementId, id, sectionId, error, uploadFileRequest }}
			/>
		);

		if ( sectionOptions.isAttachment ) return (
			<Signature {...{ id, label, value, error, required, editField }} />
		);

		return <SignatureDropzone {...{ id, value, error, editField, sectionOptions }} />;
	}
	else if ( mask === 'PHONE' ) return (
		<PhoneField
			className={ clsx ( !!isColumn && 'col-12 col-sm-6' ) }
			{...{ id, label, required, value, error, onChange, onBlur, onFocus }}
		/>
	);

	const isTextArea = type === 'TEXT_AREA';

	return (
		<TextField
			className={ clsx ( !!isColumn && `col-12 col-sm-${ sectionOptions.isAttachment ? 3 : 6 }` ) }
			type={ getTextFieldType ( type ) }
			textarea={ isTextArea }
			rows={ isTextArea ? 4 : undefined }
			{...{ id, label, required, placeholder, mask, value, error, onChange, onBlur, onFocus }}
		/>
	);
}


function getTextFieldType ( type )
{
	switch ( type )
	{
		case 'TEXT_AREA': return undefined;
		case 'DATE': return 'date';
		case 'DATE_TIME': return 'datetime-local';
		default: return 'text';
	}
}
