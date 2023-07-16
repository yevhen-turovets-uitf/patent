import React, { useCallback, useMemo } from 'react';
import { RadioButtons, SelectField } from 'components';
import Block from './Block';
import FilledSectionRow from './FilledSectionRow';
import { getStringFromFieldValuesByFlag, getEmptyLabel } from 'functions';
import { useSelector, useDispatch } from 'react-redux';
import actions from 'actions';
import clsx from 'clsx';


export default React.memo ( Switch );

function Switch ({ id, type, title, required, normalizedId, value: selected_item_id, blocks = [], policy, isColumn, readOnly, sectionOptions })
{
	const normalized = useSelector ( st => st.statement.normalized ),
		statementId = useSelector ( st => st.statement.id ),
		dispatch = useDispatch(),
		onChange = useCallback (
			e => {
				const { value } = e.target,
					selected = value === undefined ? '' : normalized[ value ].id;

				dispatch ( actions.setSwitchValue ( normalizedId, selected ) );
				dispatch ( actions.editFieldRequest ( statementId, id, selected, normalizedId ) );
			},
			[ normalizedId, normalized, statementId, id, dispatch ]
		),
		value = useMemo (
			() => blocks.find (
					normalizedId => String ( ( normalized[ normalizedId ] || {} ).id ) === String ( selected_item_id )
				) || ( type === 'RADIO' ? blocks[ 0 ] : undefined ),
			[ selected_item_id, blocks, normalized, type ]
		),
		options = useMemo (
			() => blocks.reduce (
				( res, id, i ) => {
					const option = getOption ( id, i, policy, normalized, title );

					if ( !option.label )
					{
						if ( option.value === value )
						{
							option.label = getEmptyLabel ( title, i );
						}
						else return res;
					}

					res.push ( option );

					return res;
				},
				[]
			),
			[ blocks, normalized, policy, title, value ]
		),
		error = normalized[ normalizedId ].error,
		readOnlyText = useMemo (
			() => readOnly && ( options.find ( o => String ( o.value ) === String ( value ) ) || {} ).label,
			[ readOnly, options, value ]
		);

	return (
		<React.Fragment>
			{ readOnly ?
				<FilledSectionRow {...{ title }} value={ readOnlyText } /> :
				( type === 'RADIO' ?
					<RadioButtons
						name={ normalizedId }
						{...{ options, value, onChange, error }}
					/>
					:
					<SelectField
						className={ clsx ( !!isColumn && `col-12 col-sm-${ sectionOptions.isAttachment ? 9 : 6 }` ) }
						isSearchable={ type === 'COUNTRY_SWITCH' }
						isClearable={ policy === 'GET_VALUE_FROM_SECTION' }
						label={ title }
						{...{ id, options, value, onChange, required, error }}
					/>
				)
			}
			{ policy !== 'GET_VALUE_FROM_SECTION' && type !== 'COUNTRY_SWITCH' &&
				<Block normalizedId={ value } {...{ sectionOptions, readOnly }} />
			}
		</React.Fragment>
	);
}


function getOption ( value, i, policy, normalized, title )
{
	return {
		value,
		label: policy !== 'GET_VALUE_FROM_SECTION' ? ( normalized[ value ] || {} ).title :
			getStringFromFieldValuesByFlag (
				value,
				normalized,
				'display_in_switch'
			)
	};
}
