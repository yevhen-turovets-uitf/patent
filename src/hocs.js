import React from 'react';
import { useField } from 'formik';


export function withFormikFieldWrapper ( Component )
{
	return function WithFormikFieldWrapper ( props )
	{
		const [ field, meta ] = useField ( props ),
			{ validate, ...rest } = props;

		return <Component error={ meta.touched && meta.error } { ...field } { ...rest } />;
	}
}
