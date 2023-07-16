import React, { useCallback } from 'react';
import PhoneInput from 'react-phone-number-input';
import ru from 'locale';
import { FieldWrapper } from 'components';
import CountrySelect from './CountrySelect';


export default React.memo ( PhoneField );

function PhoneField ({ className, id, label, required, error, onChange, ...rest })
{
	const handleChange = useCallback (
		value => onChange ({ target: { value } }),
		[ onChange ]
	);

	return (
		<FieldWrapper {...{ className, id, label, required, error }}>
			<PhoneInput
				className="style1"
				international
				defaultCountry="RU"
				placeholder="+7 XXX XXX XX XX"
				countrySelectComponent={ CountrySelect }
				onChange={ handleChange }
				labels={ ru }
				{ ...rest }
			/>
		</FieldWrapper>
	);
}
