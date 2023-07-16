import { createActions, handleActions } from 'redux-actions';
import * as actionTypes from 'actionTypes';
import { getNormalizedId, mapNormalizedFields, parseMessagesId } from 'functions';

const defaultState = {
	title: '',
	serviceLink: '',
	sections: [],
	normalized: {},
	scrollTo: false,
	modal: false,
	waiter: false,
	externalWaiter: false,
	error: false
};


export const actions = createActions ({
	[ actionTypes.REQUEST_STATEMENT ]: id => ({ id, waiter: + new Date() }),
	[ actionTypes.STATEMENT ]: ( statement, errors, waiter ) => ({ statement, errors, waiter }),
	[ actionTypes.ADD_STATEMENT_SECTION_REQUEST ]: ( statementId, sectionId ) => ({ statementId, sectionId, waiter: + new Date() }),
	[ actionTypes.ADD_STATEMENT_SECTION ]: ( sectionId, filledSection, waiter, error ) => ({ filledSection, sectionId, waiter, error }),
	[ actionTypes.VALIDATE_SECTIONS_REQUEST ]: ( statementId, sectionId, ids ) => ({ statementId, sectionId, ids }),
	[ actionTypes.VALIDATE_SECTIONS ]: ( statementId, sectionId, error ) => ({ statementId, sectionId, error }),
	[ actionTypes.ACCEPT_STATEMENT_REQUEST ]: id => ({ id, waiter: + new Date() }),
	[ actionTypes.ACCEPT_STATEMENT ]: ( id, waiter, error ) => ({ id, waiter, error }),
	[ actionTypes.VALIDATE_STATEMENT_REQUEST ]: id => ({ id, waiter: + new Date() }),
	[ actionTypes.VALIDATE_STATEMENT ]: ( id, waiter, error ) => ({ id, waiter, error }),
	[ actionTypes.CHANGE_STATEMENT_STATUS_REQUEST ]: id => ({ id, waiter: + new Date() }),
	[ actionTypes.CHANGE_STATEMENT_STATUS ]: ( id, waiter, error ) => ({ id, waiter, error }),
	[ actionTypes.SELECT_EXTERNAL_SECTIONS_REQUEST ]: ( statementId, sectionId, ids ) => ({ statementId, sectionId, ids }),
	[ actionTypes.SELECT_EXTERNAL_SECTIONS ]: ( statementId, sectionId, ids, result, error ) => ({ statementId, sectionId, ids, result, error }),
	[ actionTypes.RESET_STATEMENT ]: null,
	[ actionTypes.SET_SERVICE_LINK ]: serviceLink => ({ serviceLink }),
	[ actionTypes.STATEMENT_SCROLL_TO_FIELD ]: payload => payload,
	[ actionTypes.EDIT_FIELD_REQUEST ]: ( statementId, id, value, normalizedId ) => ({ statementId, id, value, normalizedId }),
	[ actionTypes.EDIT_FIELD ]: ( statementId, id, value, response, error, normalizedId ) => ({ statementId, id, value, response, error, normalizedId }),
	[ actionTypes.FIELD_ON_FOCUS ]: normalizedId => ({ normalizedId }),
	[ actionTypes.SET_SWITCH_VALUE ]: ( normalizedId, value ) => ({ normalizedId, value }),
	[ actionTypes.REMOVE_STATEMENT_SECTION_REQUEST ]: ( sectionId, id ) => ({ sectionId, id, waiter: + new Date() }),
	[ actionTypes.REMOVE_STATEMENT_SECTION ]: ( sectionId, id, data, error, waiter ) => ({ sectionId, id, data, error, waiter }),
	[ actionTypes.UPLOAD_FILE_REQUEST ]: ( statementId, id, value, sectionId, filledSectionId ) => ({ statementId, id, value, sectionId, filledSectionId, waiter: + new Date() }),
	[ actionTypes.UPLOAD_FILE ]: waiter => ({ waiter })
});

export default handleActions (
	{
		[ actionTypes.REQUEST_STATEMENT ]: ( state, { payload: { waiter } } ) => ({ ...state, waiter }),
		[ actionTypes.STATEMENT ]: statementReducer,
		[ actionTypes.ADD_STATEMENT_SECTION_REQUEST ]: ( state, { payload: { waiter } } ) => ({ ...state, waiter }),
		[ actionTypes.ADD_STATEMENT_SECTION ]: ( state, action ) => updateSectionInvalidHighlight ( addStatementSectionReducer ( state, action ) ),
		[ actionTypes.VALIDATE_SECTIONS ]: validateSectionsReducer,
		[ actionTypes.ACCEPT_STATEMENT_REQUEST ]: ( state, { payload: { waiter } } ) => ({ ...state, waiter }),
		[ actionTypes.ACCEPT_STATEMENT ]: acceptOrValidateStatementReducer,
		[ actionTypes.VALIDATE_STATEMENT_REQUEST ]: ( state, { payload: { waiter } } ) => ({ ...state, waiter }),
		[ actionTypes.VALIDATE_STATEMENT ]: acceptOrValidateStatementReducer,
		[ actionTypes.CHANGE_STATEMENT_STATUS_REQUEST ]: ( state, { payload: { waiter } } ) => ({ ...state, waiter }),
		[ actionTypes.CHANGE_STATEMENT_STATUS ]: ( state, { payload: { id, waiter, error } } ) => waiter !== state.waiter ? state : error ? ({ ...state, waiter: false }) : ({ ...state, waiter: false, modal: { modalType: 'submissionSuccess' } }),
		[ actionTypes.SELECT_EXTERNAL_SECTIONS_REQUEST ]: state => ({ ...state, externalWaiter: true }),
		[ actionTypes.SELECT_EXTERNAL_SECTIONS ]: ( state, action ) => updateSectionInvalidHighlight ( selectExternalSectionsReducer ( state, action ) ),
		[ actionTypes.RESET_STATEMENT ]: ({ waiter }) => ({ ...defaultState, waiter }),
		[ actionTypes.SET_SERVICE_LINK ]: ( state, { payload: { serviceLink } } ) => ({ ...state, serviceLink }),
		[ actionTypes.STATEMENT_SCROLL_TO_FIELD ]: ( state, { payload } ) => ({ ...state, scrollTo: payload, modal: false }),
		[ actionTypes.EDIT_FIELD_REQUEST ]: ( state, { payload: { value, normalizedId } } ) => ({
			...state,
			normalized: {
				...state.normalized,
				[ normalizedId ]: {
					...state.normalized[ normalizedId ],
					value: value instanceof Blob ? value.name : value,
					focused: false
				}
			}
		}),
		[ actionTypes.EDIT_FIELD ]: ( state, action ) => updateSectionInvalidHighlight ( editFieldReducer ( state, action ) ),
		[ actionTypes.FIELD_ON_FOCUS ]: ( state, { payload: { normalizedId } } ) => ({
			...state,
			normalized: {
				...state.normalized,
				[ normalizedId ]: {
					...state.normalized[ normalizedId ],
					focused: true
				}
			}
		}),
		[ actionTypes.SET_SWITCH_VALUE ]: ( state, { payload: { normalizedId, value } } ) => ({
			...state,
			normalized: {
				...state.normalized,
				[ normalizedId ]: {
					...state.normalized[ normalizedId ],
					value
				}
			}
		}),
		[ actionTypes.REMOVE_STATEMENT_SECTION_REQUEST ]:  ( state, { payload: { waiter } } ) => ({ ...state, waiter }),
		[ actionTypes.REMOVE_STATEMENT_SECTION ]: removeStatementSectionReducer,
		[ actionTypes.UPLOAD_FILE_REQUEST ]: ( state, { payload: { waiter } } ) => ({ ...state, waiter }),
		[ actionTypes.UPLOAD_FILE ]: ( state, { payload: { waiter } } ) => state.waiter === waiter ? ({ ...state, waiter: false }) : state
	},
	defaultState
);


function statementReducer ( state, { payload: { waiter, statement, errors } } )
{
	state = { ...defaultState, ...statement, waiter: false };

	if ( state.error ) return state;

	const empty = !state.sections.find (
		({ id }) => !isEmpty (
			getNormalizedId ( id, 'SECTION' ),
			state.normalized
		)
	);

	if ( empty ) return state;

	if ( errors ) state = applySectionInvalidHighlight ( { ...statement, waiter: false }, errors );

	return applySectionValidHighlight ( state );
}

function addStatementSectionReducer ( state, { payload: { waiter, error, sectionId, filledSection } } )
{
	waiter = state.waiter === waiter ? false : waiter;

	if ( error && error.messages )
	{
		return {
			...applySectionInvalidHighlight ( state, error.messages ),
			waiter
		};
	}

	if ( error ) return { ...state, error, waiter };

	let { sections, normalized } = state,
		index = sections.findIndex ( ({ id }) => id === sectionId );

	if ( index === -1 )
	{
		console.error ( 'invalid index' );

		return state;
	}

	const section = sections[ index ],
		normalizedSectionId = getNormalizedId ( sectionId, 'SECTION' ),
		normalizedFilledSectionId = getNormalizedId ( filledSection.section.id, 'FILLED_SECTION' );

	sections = sections.slice();
	sections[ index ] = { ...section, blocks: [ ...section.blocks, filledSection.section ] };
	normalized = { ...normalized, ...filledSection.normalized };
	normalized[ normalizedSectionId ] = {
		...normalized[ normalizedSectionId ],
		blocks: [
			...normalized[ normalizedSectionId ].blocks,
			normalizedFilledSectionId
		],
		external_sections_error: false,
	};

	normalized = updateFilledSectionsInsideSwitches (
		sectionId,
		filledSection.referred_switches,
		normalized
	);

	return { ...state, sections, normalized, waiter };
}

function validateSectionsReducer ( state, { payload: { statementId, sectionId, error: { messages } = {} } } )
{
	if ( String ( statementId ) !== String ( state.id ) ) return state;

	let normalizedSectionId = getNormalizedId ( sectionId, 'SECTION' ),
		section = state.normalized[ normalizedSectionId ];

	if ( section.invalidFields && section.invalidFields.length )
	{
		state = section.invalidFields.reduce (
			( state, id ) => {
				const { normalizedId, errorName } = parseMessagesId ( id );

				return {
					...state,
					normalized: {
						...state.normalized,
						[ normalizedId ]: {
							...state.normalized[ normalizedId ],
							[ errorName ]: false
						}
					}
				};
			},
			state
		);

		section = state.normalized[ normalizedSectionId ]; // Section was redefined;

		section.invalidFields = false;
	}

	if ( messages ) return applySectionInvalidHighlight ( state, messages );

	const empty = isEmpty ( normalizedSectionId, state.normalized );

	return {
		...state,
		normalized: {
			...state.normalized,
			[ normalizedSectionId ]: {
				...section,
				valid: section.is_required || ( !section.is_required && !empty ),
				empty
			}
		}
	};
}

function acceptOrValidateStatementReducer ( state, { type, payload: { id, waiter, error: { messages, errors } = {} } } )
{
	if ( state.id !== id || waiter !== state.waiter ) return state;

	if ( errors )
	{
		return {
			...state,
			modal: { modalType: 'externalServiceError', errors },
			waiter: false
		};
	}

	let firstInvalidField;

	const { sections, normalized } = state,
		invalidSections = !messages ? [] : sections.filter (
			({ id }) => {
				const normalizedId = getNormalizedId ( id, 'SECTION' ),
					section = normalized[ normalizedId ],
					invalidFields = [];

				if ( !section.visible ) return false;

				if ( section.is_required && section.external_sections.length && !section.blocks.length )
				{
					invalidFields.push ( `section_type_${ id }` );
				}

				mapNormalizedFields (
					normalizedId,
					normalized,
					({ id, required, value }) => !!( ( messages[ id ] || ( section.is_required && required && !value ) ) && invalidFields.push ( id ) ) || null
				);

				if ( !firstInvalidField ) firstInvalidField = invalidFields[ 0 ];

				return invalidFields.length;
			}
		),
		target = type === actionTypes.ACCEPT_STATEMENT ? 'submission' : 'validation',
		modalType = target + ( invalidSections.length ? 'Error' : 'Success' ),
		{ length } = invalidSections,
		scrollTo = length ? { sectionId: invalidSections[ 0 ].id, fieldId: firstInvalidField } : false;

	state = sections.reduce (
		( state, section ) => validateSectionsReducer (
			state,
			{ payload: {
				statementId: id,
				sectionId: section.id,
				error: { messages }
			} }
		),
		state
	);

	return {
		...state,
		modal: { modalType, invalidSections, scrollTo },
		waiter: false
	};
}

function applySectionInvalidHighlight ( state, errors )
{
	if ( !errors ) return state;

	const ids = Object.keys ( errors ),
		normalized = { ...state.normalized };

	ids.forEach ( id => {
		const { normalizedId, errorName } = parseMessagesId ( id );

		if ( !normalized[ normalizedId ] ) return alert ( 'Сервер вернул ошибку о том, что неправильно заполнено несуществующее поле формы с id: ' + normalizedId );

		normalized[ normalizedId ] = {
			...normalized[ normalizedId ],
			[ errorName ]: errors[ id ]
		};

		const { normalizedId: normalizedSectionId } = findParentUntilType ( normalizedId, 'SECTION', normalized ),
			invalidFields = normalized[ normalizedSectionId ].invalidFields || [];

		if ( invalidFields.indexOf ( id ) === -1 ) invalidFields.push ( id );

		normalized[ normalizedSectionId ] = { ...normalized[ normalizedSectionId ], invalidFields, valid: false };
	} );

	return { ...state, normalized };
}

function applySectionValidHighlight ( state )
{
	const normalized = state.sections.reduce (
		( normalized, { id } ) => {
			const normalizedId = getNormalizedId ( id, 'SECTION' ),
				section = normalized[ normalizedId ];

			if ( section.invalidFields ) return normalized;

			const empty = !section.is_required && isEmpty ( normalizedId, normalized );

			return {
				...normalized,
				[ normalizedId ]: {
					...section,
					valid: true,
					empty
				}
			};
		},
		state.normalized
	);

	return { ...state, normalized };
}

function updateSectionInvalidHighlight ( state )
{
	const sections = state.sections.slice(),
		normalized = { ...state.normalized };

	sections.forEach ( ({ id }) => {
		const normalizeSectiondId = getNormalizedId ( id, 'SECTION' ),
			section = normalized[ normalizeSectiondId ];

		if ( section.invalidFields )
		{
			let invalidFields = [];

			section.invalidFields.forEach ( fieldId => {
				const { normalizedId, errorName } = parseMessagesId ( fieldId ),
					block = normalized[ normalizedId ];

				if ( block && block[ errorName ] ) invalidFields.push ( fieldId );
			} );

			invalidFields = invalidFields.length ? invalidFields : false;

			normalized[ normalizeSectiondId ] = { ...normalized[ normalizeSectiondId ], invalidFields };
		}
	} );

	return { ...state, sections, normalized };
}

function editFieldReducer ( state, { payload: { statementId, id, value, response, error, normalizedId } } )
{
	if ( state.id !== statementId || state.normalized[ normalizedId ].focused ) return state;

	if ( error ) state = applySectionInvalidHighlight ( state, { [ id ]: error } );

	const { normalized } = state;

	if ( !error && response )
	{
		const { sections_to_show, sections_to_hide } = response;

		if ( sections_to_show ) state = updateSectionsVisibility ( state, sections_to_show, true );
		if ( sections_to_hide ) state = updateSectionsVisibility ( state, sections_to_hide, false );
	}

	return {
		...state,
		normalized: {
			...clearSwitchBranches ( normalizedId, normalized ),
			[ normalizedId ]: {
				...normalized[ normalizedId ],
				error,
				value
			}
		}
	};
}

function updateSectionsVisibility ( state, ids, visible )
{
	return ids.reduce (
		( state, sectionId ) => {
			const sections = state.sections.slice(),
				index = sections.findIndex ( ({ id }) => id === sectionId );

			if ( index === -1 ) return state;

			sections[ index ] = { ...sections[ index ], visible };

			const normalizedId = getNormalizedId ( 'SECTION', sectionId ),
				normalized = {
					...state.normalized,
					[ normalizedId ]: {
						...state.normalized[ normalizedId ],
						visible
					}
				};

			return { ...state, sections, normalized };
		},
		state
	);
}

function findParentUntilType ( normalizedId, type, normalized )
{
	if ( !normalized ) return false;

	const block = normalized[ normalizedId ];

	if ( block.type === type ) return block;

	return findParentUntilType ( block.normalizedParentId, type, normalized );
}

function findParentsByType ( normalizedId, type, normalized, initial = [], until )
{
	if ( !normalized || normalizedId === undefined ) return initial;

	const block = normalized[ normalizedId ];

	if ( until )
	{
		if (! Array.isArray ( until ) ) until = until.concat ( until );

		if ( until.indexOf ( block.type ) !== -1 ) return initial;
	}
	else if ( Array.isArray ( type ) ? type.indexOf ( block.type ) !== -1 : block.type === type )
	{
		initial = initial.concat ( block );
	}

	const parentRes = findParentsByType ( block.normalizedParentId, type, normalized, undefined, until );

	return initial.concat ( parentRes );
}

function clearSwitchBranches ( normalizedId, normalized )
{
	return findParentsByType ( normalizedId, [ 'SWITCH', 'RADIO' ], normalized, undefined, 'FILLED_SECTION' ).reduce (
		( normalized, { blocks, value } ) => blocks.reduce (
			( normalized, normalizedId ) => String ( normalized[ normalizedId ].id ) !== String ( value ) ?
				clearRecursively ( normalizedId, normalized ) : normalized,
			normalized
		),
		normalized
	);
}

function clearRecursively ( normalizedId, normalized )
{
	const { [ normalizedId ]: block } = normalized,
		{ value } = block,
		newNormalized = ( value === undefined || value === '' ) ? normalized : { ...normalized, [ normalizedId ]: { ...block, value: '' } };

	return block.blocks.reduce (
		( newNormalized, normalizedId ) => clearRecursively ( normalizedId, newNormalized ),
		newNormalized
	);
}

function removeStatementSectionReducer ( state, { payload: { sectionId, id, data, error, waiter } } )
{
	waiter = state.waiter === waiter ? false : state.waiter;

	if ( error ) return ({ ...state, waiter });

	const sections = state.sections.slice(),
		sectionIndex = sections.findIndex ( ({ id }) => id === sectionId );

	if ( sectionIndex === -1 ) console.error ( `Нету секции ${ sectionId }` );

	const filled_sections = sections[ sectionIndex ].blocks.slice(),
		index = filled_sections.findIndex ( fs => fs.id === id ),
		normalizedSectionId = getNormalizedId ( sectionId, 'SECTION' );

	if ( index !== -1 ) filled_sections.splice ( index, 1 );
	else console.error ( `[removeStatementSectionReducer] Нету filled_section ${ id } у секции ${ sectionId }` );

	sections[ sectionIndex ] = { ...sections[ sectionIndex ], blocks: filled_sections };

	let { normalized } = state;

	const normalizedSection = normalized[ normalizedSectionId ],
		{ blocks } = normalizedSection,
		normalizedFilledSectionId = getNormalizedId ( id, 'FILLED_SECTION' ),
		index2 = blocks.findIndex ( id => id === normalizedFilledSectionId );

	if ( index2 !== -1 ) blocks.splice ( index2, 1 );
	else console.error ( `[removeStatementSectionReducer] Нету filled_section ${ normalizedFilledSectionId } у секции ${ normalizedSection }` );

	if ( index !== index2 )
	{
		console.error ( `[removeStatementSectionReducer] Индексы filled_section не совпадают: ${ id } и ${ normalizedFilledSectionId }` );
	}

	normalized = {
		...normalized,
		[ normalizedSectionId ]: {
			...normalizedSection,
			blocks: blocks.slice()
		}
	};

	normalized = updateFilledSectionsInsideSwitches (
		sectionId,
		( data || {} ).referred_switches,
		removeRecursively (
			getNormalizedId ( id, 'FILLED_SECTION' ),
			normalized
		)
	);

	return updateSectionInvalidHighlight ({ ...state, normalized, sections, waiter });
}

function removeRecursively ( normalizedId, normalized )
{
	const { [ normalizedId ]: block, ...newNormalized } = normalized;

	if ( block.type === 'SWITCH' && block.policy === 'GET_VALUE_FROM_SECTION' ) return normalized;

	return block.blocks.reduce (
		( newNormalized, normalizedId ) => removeRecursively ( normalizedId, newNormalized ),
		newNormalized
	);
}

function updateFilledSectionsInsideSwitches ( sectionId, switches, normalized )
{
	const normalizedSectionId =  getNormalizedId ( sectionId, 'SECTION' ),
		{ blocks: filledSections } = normalized[ normalizedSectionId ];
		// targetFilledSections = filledSections.slice ( 0, filledSections.length - 1 ); // skip last

	return ( switches || [] ).reduce (
		( normalized, id ) => {
			const normalizedSwitchId = getNormalizedId ( id, 'SWITCH' ),
				normalizedSwitch = normalized[ normalizedSwitchId ],
				{ value, blocks } = normalizedSwitch;

			return {
				...normalized,
				[ normalizedSwitchId ]: {
					...normalizedSwitch,
					blocks: filledSections,
					value: value && blocks.indexOf ( value ) === -1 ? '' : value
				}
			};
		},
		normalized
	);
}

function selectExternalSectionsReducer ( state, { payload: { statementId, sectionId, ids, result = {}, error } } )
{
	if ( String ( statementId ) !== String ( state.id ) ) return state;

	const { sections, removed, referred_switches, normalized } = result;

	if ( !error && removed && result.removed.length )
	{
		state = result.removed.reduce (
			( state, id ) => removeStatementSectionReducer (
				state,
				{ payload: { sectionId, id, data: { referred_switches } } }
			),
			state
		);
	}

	if ( !error && sections && sections.length )
	{
		// TODO: move normalized to filledSection.
		state = sections.reduce (
			( state, section ) => addStatementSectionReducer (
				state,
				{ payload: { sectionId, filledSection: { section, referred_switches } } }
			),
			state
		);
	}

	const normalizedSectionId = getNormalizedId ( sectionId, 'SECTION' ),
		normalizedSection = state.normalized[ normalizedSectionId ];

	// For refresh ExternalSelect.
	if ( error )
	{
		return {
			...state,
			externalWaiter: false,
			normalized: {
				...state.normalized,
				[ normalizedSectionId ]: {
					...normalizedSection,
					blocks: normalizedSection.blocks.slice(),
					external_sections_error: error.message
				}
			}
		};
	}

	return {
		...state,
		externalWaiter: false,
		normalized: {
			...state.normalized,
			...normalized, // TODO: move normalized to filledSection.
			[ normalizedSectionId ]: {
				...normalizedSection,
				external_sections_error: false
			}
		}
	};
}

function isEmpty ( normalizedId, normalized )
{
	const block = normalized[ normalizedId ];

	if ( block.type === 'SECTION' && block.external_sections.length && block.blocks.length ) return false;

	return !mapNormalizedFields (
		normalizedId,
		normalized,
		callback
	).length;

	function callback ( { type, value, default_value }, normalized, callBreak )
	{
		if ( type === 'RADIO' ) return null;

		if ( type === 'CHECK_BOX' )
		{
			if ( default_value === value ) return null;
			if ( ( default_value === 'False' && value === false ) || ( default_value === 'True' && value === true ) ) return null;
		}

		if ( value !== default_value )
		{
			callBreak();

			return true;
		}

		return null;
	}
}
