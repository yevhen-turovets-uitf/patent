/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { scrollWindowToElement } from 'functions';
import actions from 'actions';
import clsx from 'clsx';


export default React.memo ( FieldWrapper );

function FieldWrapper ({ className, id, noLabel, label, required, error, children, ...rest })
{
	const scrollTo = useSelector ( st => id !== undefined && ( st.statement.scrollTo || {} ).fieldId === id ),
		dispatch = useDispatch(),
		ref = useCallback (
			!scrollTo ? undefined : elem => {
				if ( elem )
				{
					setTimeout (
						() => scrollWindowToElement ( elem )
					);

					dispatch ( actions.statementScrollToField ( false ) );
				}
			},
			[ scrollTo, dispatch ]
		);

	return (
		<div {...{ ref }} className={ clsx ( 'input-row', !!className && className, !!error && 'error' ) } { ...rest }>
			{ !noLabel &&
				<label className={ clsx ( !!required && 'required' ) }>{ label }</label>
			}
			{ children }
			{ !!error &&
				<div className="input-error-massage">{ error }</div>
			}
		</div>
	);
}
