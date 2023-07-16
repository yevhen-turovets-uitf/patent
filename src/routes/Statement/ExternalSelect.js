/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SelectInput, FieldWrapper } from 'components';
import { components as selectComponents } from 'react-select';
import { getStringFromFieldValuesByFlag, getNormalizedId, getEmptyLabel } from 'functions';
import actions from 'actions';
const Option = props => (
		<selectComponents.Option className="with-checkbox" { ...props }>
			<div className="checkbox-item">
				<input
					type="checkbox"
					checked={ props.isSelected }
					onChange={ () => null }
				/>
				{ ' ' }
				<label><i className="base-icon-check"></i><span>{ props.label }</span></label>
			</div>
		</selectComponents.Option>
	),
	ValueContainer = props => (
		<selectComponents.ValueContainer { ...props }>
			{  props.hasValue &&
				<div>
					{ props.getValue()
						.filter ( o => o !== allOption )
						.map ( o => o.label ).join ( ', ' )
					}
				</div>
			}
			{ React.Children.toArray ( props.children )
				.map ( elem => elem.type === selectComponents.MultiValue ? null : elem )
			}
		</selectComponents.ValueContainer>
	),
	components = {
		Option,
		ValueContainer
	},
	allOption = { value: '*', label: 'Выбрать всех' };


export default React.memo ( ExternalSelect );

function ExternalSelect ({ statementId, currentSection, normalized, isMulti, error })
{
	const { id: sectionId, external_sections } = currentSection,
		normalizedSectionId = useMemo ( () => getNormalizedId ( sectionId, 'SECTION' ), [ sectionId ] ),
		{ title, short_title = title, blocks: filledSections } = normalized[ normalizedSectionId ],
		dispatch = useDispatch(),
		externalWaiter = useSelector ( state => state.statement.externalWaiter ),
		[ initialOptions, setInitialOptions ] = useState ( [] ),
		[ initialValue, setInitialValue ] = useState ( [] ),
		[ options, setOptions ] = useState ( [] ),
		[ value, setValue ] = useState ( [] ),
		select = useCallback (
			value => dispatch (
				actions.selectExternalSectionsRequest (
					statementId,
					sectionId,
					[].concat (
						Array.isArray ( value ) && value.find ( o => o === allOption ) ? options.filter ( o => o !== allOption ) : ( value || [] )
					).map ( o => o.value )
				)
			),
			[ statementId, sectionId, dispatch, options ]
		),
		onChange = useCallback (
			( selected, { option } = {} ) => !isMulti ? select ( selected.target ) : setValue ( correctAllOptionSelection ( selected, options, option ) ),
			[ isMulti, select, options ]
		),
		onBlur = useCallback (
			isMulti ? () => select ( value ) : undefined,
			[ value, isMulti ]
		);

	useEffect (
		() => setInitialOptions (
			getInitialOptions ( external_sections, normalized, short_title )
		),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ external_sections, short_title ]
	);

	useEffect (
		() => setInitialValue (
			getInitialValue ( filledSections, normalized )
		),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ filledSections ]
	);

	useEffect (
		() => setOptions (
			getOptions ( initialOptions, initialValue, isMulti )
		),
		[ initialOptions, initialValue, isMulti ]
	);

	useEffect (
		() => setValue (
			getValue ( initialValue, options, isMulti )
		),
		[ initialValue, options, isMulti ]
	);

	return (
		<FieldWrapper id={ `section_type_${ sectionId }` } {...{ error }}>
			<SelectInput
				placeholder="Выбрать"
				isClearable={ !isMulti }
				closeMenuOnSelect={ !isMulti }
				hideSelectedOptions={ !isMulti }
				isLoading={ externalWaiter }
				components={ isMulti ? components : undefined }
				{...{ value, options, onChange, onBlur, isMulti, error }}
			/>
		</FieldWrapper>
	);
}


function getInitialOptions ( external_sections, normalized, short_title )
{
	return external_sections.map (
		( { id }, i ) => {
			const label = getStringFromFieldValuesByFlag (
				getNormalizedId ( id, 'FILLED_SECTION' ),
				normalized,
				'display_in_switch'
			);

			return {
				value: id,
				label: label || getEmptyLabel ( short_title, i ),
				emptyFields: !label
			}
		}
	);
}

function getInitialValue ( filledSections, normalized )
{
	return filledSections.reduce (
		( res, normalizedId ) => {
			const { external_section_id, is_external } = normalized[ normalizedId ] || {};

			if ( is_external ) res.push ( external_section_id );

			return res;
		},
		[]
	);
}

function getOptions ( initialOptions, initialValue, isMulti )
{
	const options = initialOptions.filter (
		option => !option.emptyFields || initialValue.find ( v => v === option.value )
	);

	return isMulti && options.length ? [ allOption ].concat ( options ) : options;
}

function getValue ( initialValue, options, isMulti )
{
	if ( isMulti ) return correctAllOptionSelection (
		options.filter (
			({ value }) => initialValue.includes ( value )
		),
		options
	);

	return ( options.find (
		({ value }) => initialValue.includes ( value )
	) || {} ).value;
}

function correctAllOptionSelection ( selected, options, option )
{
	const { length } = selected;

	if ( length === options.length ) return selected;
	else if ( option === allOption )
	{
		return selected.find ( o => o === allOption ) ? options : [];
	}
	else if ( length && length === options.length - 1 && !selected.find ( o => o === allOption ) )
	{
		return [ allOption ].concat ( selected );
	}
	else if ( !selected.find ( o => o === allOption ) ) return selected;
	else return selected.filter ( o => o !== allOption );
}
