import React, { useCallback } from 'react'
import PropTypes from 'prop-types';
import { SelectInput } from 'components';
const components = {
	SingleValue: ({ data: { value } = {} }) => value || null
};


export default function CountrySelect ({ value, options, onChange, ...rest })
{
	const handleChange = useCallback (
		e => {
			const value = e.target.value;

			onChange ( value === 'ZZ' ? undefined : value );
		},
		[ onChange ]
	);
	// "ZZ" means "International".
	// (HTML requires each `<option/>` have some string `value`).
	return (
		<SelectInput
			{ ...rest }
			isSearchable
			value={ value || 'ZZ' }
			onChange={ handleChange }
			{...{ options, components }}
		/>
	)
}

CountrySelect.propTypes = {
	/**
	 * A two-letter country code.
	 * Example: "US", "RU", etc.
	 */
	value: PropTypes.string,

	/**
	 * Updates the `value`.
	 */
	onChange: PropTypes.func.isRequired,

	// `<select/>` options.
	options: PropTypes.arrayOf ( PropTypes.shape ({
		value: PropTypes.string,
		label: PropTypes.string,
		divider: PropTypes.bool // never saw
	}) ).isRequired
}
