import React from 'react';


export default React.memo ( RadioButtons );

function RadioButtons ({ name, options, value: current, error, onChange })
{
	return (
		<div className="subject-status-radio radio-row">
			{ options.map ( ({ value, label }) => (
				<label key={ value } className="radio-item">
					<input
						type="radio"
						checked={ String ( value ) === String ( current ) }
						{...{ name, value, onChange }}
					/>
					<span><i />{ label || value }</span>
				</label>
			) ) }
			{ !!error &&
				<div className="input-error-massage">{ error }</div>
			}
		</div>
	);
}
