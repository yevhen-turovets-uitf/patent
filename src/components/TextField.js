import React, { useMemo } from 'react';
import MaskedInput from 'react-text-mask';
import { FieldWrapper } from 'components';
import textMasks from 'textMasks';


export default React.memo ( TextField );

function TextField ({ className, id, label, required, placeholder = label, mask, textarea, error, onBlur, onChange, ...rest })
{
	const currentMask = !textarea && textMasks[ mask ],
		Component = textarea ? 'textarea' : ( currentMask ? MaskedInput : 'input' ),
		maskProps = useMemo (
			() => currentMask ? {
				...textMasks.options,
				mask: currentMask.mask,
				placeholder: currentMask.placeholder || placeholder,
				onBlur: !onBlur ? undefined : !currentMask.unmask ? onBlur : e => onBlur ({ target: { ...e.target, value: currentMask.unmask ( e.target.value ) } }),
				onChange: !onChange ? undefined : !currentMask.unmask ? onChange : e => onChange ({ target: { ...e.target, value: currentMask.unmask ( e.target.value ) } })
			} : {},
			[ currentMask, placeholder, onBlur, onChange ]
		);

	return (
		<FieldWrapper {...{ className, id, label, required, error }}>
			<Component
				className="style1"
				{...{ mask, placeholder, onBlur, onChange }}
				{ ...maskProps }
				{ ...rest }
			/>
		</FieldWrapper>
	);
}
