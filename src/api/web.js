import { create } from 'apisauce';
import Reactotron from 'reactotron-react-js';
import { getNormalizedId, objToURIParamString } from 'functions';
import Cookies from 'js-cookie';
import api from 'api';

const errorResponse = {
	error: {
		code: 'default',
		message: 'Ошибка в параметрах ответа сервера'
	}
};

const dev = process.env.NODE_ENV === 'development',
	baseURL = '/api/v1/',
	http = create ({ baseURL }),
	egrApi = create ({ baseURL: 'http://gis-egr-web-2.fips.rospat:5300/api/'});

let preventAlert = false;

http.addResponseTransform ( response => {
	const { data, ok, problem, status } = response;

	let error = ( data && data.error ) || ( status === 401 || status === 403 ? { code: 'unauthorized' } : problem ? { code: problem, message: problem } : false );

	if ( status === 401 || status === 403 ) error.code = 'unauthorized';

	if ( status === 404 ) error.code = '404';

	if ( !error && !ok ) error = errorResponse;

	if ( error )
	{
		response.error = error;

		if ( !preventAlert && Array.isArray ( error.messages ) ) preventAlert = !window.confirm ( JSON.stringify ( error.messages, null, 4 ) );
	}
} );

if ( dev ) http.addMonitor ( Reactotron.apisauce );


export function getBaseURL ()
{
	return http.getBaseURL();
}

export function getServices ()
{
	return request (
		http.get ( 'services' )
	);
}

export function getService ( name )
{
	return request (
		http.get ( `service/${ name }` )
	);
}

export function createDraftStatement ( name, parent_statement_id )
{
	return request (
		http.post (
			`create-draft-statement/${ name }`,
			{ parent_statement_id },
			withCSRFConfig()
		),
		({ sections = [], ...rest }) => ({
			...rest,
			sections: sections.map ( statementAdapter ),
			normalized: normalizeSections ( sections )
		})
	);
}

export function removeDraftStatement ( id )
{
	return request (
		http.post (
			`remove-draft-statement`,
			{ id },
			withCSRFConfig()
		)
	);
}

export function copyStatement ( id )
{
	return request (
		http.post (
			`copy-statement`,
			{ id },
			withCSRFConfig()
		)
	);
}

export function getStatement ( name )
{
	return request (
		http.get ( `statement/${ name }` ),
		prepareStatement
	);
}

export function editField ( id, value, isFile )
{
	const body = !isFile ? { id, value } : ( new FormData() );

	if ( isFile )
	{
		body.set ( 'id', id );
		body.set ( 'value', value, value.name );
	}

	return request (
		http.post (
			`edit-field`,
			body,
			withCSRFConfig()
		)
	);
}

export function addSection ( statement_id, section_type_id )
{
	const normalizedSectionId = getNormalizedId ( section_type_id, 'SECTION' );

	return request (
		http.post (
			`create-new-section`,
			{ statement_id, section_type_id },
			withCSRFConfig()
		),
		({ section, ...rest }) => {
			return ({
				...rest,
				section: statementAdapter ( section ),
				normalized: getSectionNormalizer ( `${ section_type_id }-root`, normalizedSectionId )( {}, { ...section, type: 'FILLED_SECTION' } )
			});
		}
	);
}

export function selectExternalSections ( statement_id, section_type_id, external_section_ids )
{
	const normalizedSectionId = getNormalizedId ( section_type_id, 'SECTION' );

	return request (
		http.post (
			`select-external-sections`,
			{ statement_id, section_type_id, external_section_ids },
			withCSRFConfig()
		),
		({ sections, deleted_section_ids: removed, ...rest }) => ({
			...rest,
			removed,
			sections: sections.map ( statementAdapter ),
			normalized: normalizeSections ( sections, `${ section_type_id }-root`, {}, normalizedSectionId )
		})
	);
}

export function validateSections ( statement_id, section_type_id )
{
	return request (
		http.get ( `validate-section${ objToURIParamString ({ statement_id, section_type_id }) }` )
	);
}

export function validateStatement ( id )
{
	return request (
		http.get ( `validate-statement?id=${ id }` )
	);
}

export function acceptStatement ( id )
{
	return request (
		http.post (
			`accept-statement`,
			{ id },
			withCSRFConfig()
		)
	);
}

export function changeStatementStatus ( id )
{
	return request (
		http.post (
			`change-statement-status`,
			{ id },
			withCSRFConfig()
		)
	);
}

export function removeSection ( id )
{
	return request (
		http.post (
			`remove-section`,
			{ id },
			withCSRFConfig()
		)
	);
}

export function profile ()
{
	return request (
		http.get ( `profile` ),
		({ statements_count: statements = 0, objects_count: objects = 0, ...rest }) => ({ ...rest, statements, objects }),
		undefined,
		true
	);
}

export function selectUserRole ( oid )
{
	return request (
		http.post (
			`select-user-role/${ oid }`,
			null,
			withCSRFConfig()
		)
	);
}

export function downloadStatement ( id )
{
	return request (
		http.get (
			`load-statement?id=${ id }`,
			null,
			{ responseType: 'blob' }
		)
	);
}

export function getFilledStatements ({ offset = 0, limit = 10, status, search: filter_value, order: date_sort_order = 'desc' })
{
	return request (
		http.get ( `user-statements` + objToURIParamString ({ offset, limit, status, filter_value, date_sort_order }) )
	);
}

export function getFilledStatementsCSV ({ search: filter_value, order: date_sort_order = 'desc' })
{
	return request (
		http.get ( `csv-statements-representation` + objToURIParamString ({ filter_value, date_sort_order }) )
	);
}

export function getFilledStatement ( id )
{
	return request (
		http.get ( `user-statement/${ id }` )
	);
}

export function getAppealSubjects ()
{
	return request (
		http.get ( `available-message-subjects` ),
		res => Object.keys ( res ).map ( value => ({ value, label: res[ value ] }) )
	);
}

export function createAppeal ( subject, message_text )
{
	return request (
		http.post (
			`send-message`,
			{ subject, message_text },
			withCSRFConfig()
		)
	);
}

export function getAppeals ()
{
	return request (
		http.get ( `messages` )
	);
}

export function downloadAttachment ( id )
{
	return request (
		http.get (
			`download-attachment?id=${ id }`,
			null,
			{ responseType: 'blob' }
		)
	);
}

export function setStatementImage ( id, image )
{
	const body = new FormData();

	body.set ( 'id', id );
	body.set ( 'image', image, image.name );

	return request (
		http.post (
			`set-statement-image`,
			body,
			withCSRFConfig()
		)
	);
}

export function getStatementImage ( id )
{
	return request (
		http.get (
			`load-statement-image?id=${ id }`,
			null,
			{ responseType: 'blob' }
		),
	);
}

export function getReferredStatementTypes ( id )
{
	return request (
		http.get ( `referred-statement-types?id=${ id }` )
	);
}

export function getExternalLinks ()
{
	return request (
		http.get ( `external-links` ),
		// Для поддержки unicode из админки (например \u00A0)
		links => links.map (
			({ title, ...rest }) => ({ ...rest, title: JSON.parse ( `"${ title }"` ) })
		),
		undefined,
		true
	);
}

export function getNotifications ()
{
	return request (
		http.get ( `messages` ),
		({ messages }) => messages.filter ( m => m.finalDecision ),
		undefined,
		true
	);
}

export function markNotificationAsRead ( case_number )
{
	return request (
		http.post (
			`set-message-status`,
			{ case_number, value: true },
			withCSRFConfig()
		)
	);
}

export function getMktuClassCodes ()
{
	return request (
		http.get ( `opendata/current/mktu/class-codes` )
	);
}

export function getMktuClassList ( current_page )
{
	return request (
		http.get ( `opendata/current/mktu/classes?current_page=${current_page}` )
	);
}

export function getMktuClassDetailed ( classNumber, current_page )
{
	return request (
		http.get ( `opendata/current/mktu/class/${classNumber}?current_page=${current_page}` )
	);
}

export function mktuSearch ( params )
{
	return request (
		http.post (
			`opendata/current/mktu/search`,
			{ ...params },
			withCSRFConfig()
		)
	);
}

export function getMktuVersion ()
{
	return request (
		http.get ( `opendata/archive/mktu` )
	);
}

export function getMktuViennese ()
{
	return request (
		http.get ( `opendata/archive/vkl` )
	);
}

export function getMktuIdentifier ()
{
	return request (
		http.get ( `opendata/archive/lexsem` )
	);
}

export function egrSearchDocuments ( expression )
{
	return request (
		egrApi.post ( `EgrService/SearchDocuments` ),
		{ expression },
		undefined,
		true
	);
}

export function egrGenerateReport ( expression )
{
	return request (
		egrApi.post ( `EgrService/GenerateReport` ),
		{ expression },
		undefined,
		true
	);
}

function request ( promise, handleResult, handleError = error => ({ error }), skipWaiter )
{
	const resultHandler = getResultHandler ( handleResult );

	if ( skipWaiter ) return promise
		.then ( resultHandler )
		.catch ( handleError );

	const waiter = api.progress.start(),
		stopWaiter = res => {
			api.progress.stop ( waiter );

			return res;
		};

	return promise
		.then ( resultHandler )
		.then ( stopWaiter )
		.catch ( err => stopWaiter ( handleError ( err ) ) );
}

// (fn|arr|str) => obj
function getResultHandler ( fn = res => res )
{
	return ({ data, ok, problem, error }) => {
		if ( error ) return { error };
		else if ( data && data.error ) return { error: data.error };

		if ( typeof fn === 'string' || Array.isArray ( fn ) )
		{
			const props = [].concat ( fn );

			fn = data => props.reduce (
				( res, prop ) => ({ ...res, [ prop ]: data[ prop ] }),
				{}
			);
		}

		const result = fn ( data );

		return { result };
	}
}


function prepareStatement ({ parent_id, sections = [], transition_link, ...rest })
{
	const isReferred = parent_id !== null,
		title = isReferred ? 'Отправка документа' : 'Отправка заявления';

	sections = sections.map ( section => ({
			...section,
			visible: ( section.sections[ 0 ] || { visible: true } ).visible
		}) )
		.concat ({
			id: title,
			title,
			short_title: title,
			many: false,
			visible: true,
			type: 'SECTION',
			section_type: 'Отправка заявления',
			external_sections: []
		});

	return ({
			...rest,
			isReferred,
			parent_id,
			serviceLink: transition_link,
			sections: sections.map ( statementAdapter ),
			normalized: normalizeSections ( sections )
	});
}

function statementAdapter ({ sections, children, blocks, ...rest })
{
	if ( !sections && !children && !blocks ) return rest;

	return ({ ...rest, blocks: ( sections || children || blocks ).map ( statementAdapter ) });
}

function normalizeSections ( sections = [], postfix = '-root', initial = {}, normalizedParentId )
{
	return sections.reduce ( getSectionNormalizer ( postfix, normalizedParentId ), initial );
}

function getSectionNormalizer ( postfix = '', normalizedParentId )
{
	return parseTree;

	function parseTree ( initial = {}, block = {} )
	{
		const { id, sections, blocks, children = sections || blocks || [], external_sections = [], mask, validator_name } = block,
			type = block.type,
			nextPostfix = `-${ id }` + postfix,
			normalizedId = getNormalizedId ( id, type, postfix ),
			value = type === 'DATE' ? ( block.value || '' ).split ( '.' ).reverse().join ( '-' ) : block.value; // TODO: remove

		if ( initial[ normalizedId ] && type === 'FILLED_SECTION' && initial[ normalizedParentId ] && initial[ normalizedParentId ].type === 'SWITCH' )
		{
			return initial;
		}

		const normalized = children.reduce (
			getSectionNormalizer ( nextPostfix, normalizedId ),
			{
				...initial,
				[ normalizedId ]: {
					...block,
					mask: mask || validator_name,
					value,
					normalizedId,
					normalizedParentId,
					type,
					blocks: children.map ( ( { type, id } = {} ) => getNormalizedId ( id, type, nextPostfix ) )
				}
			}
		);

		if ( external_sections.length )
		{
			return normalizeSections ( external_sections, nextPostfix, normalized );
		}

		return normalized;
	}
}

function withCSRFConfig ( defaultConfig = {} )
{
	return {
		...defaultConfig,
		headers: {
			...defaultConfig.headers,
			'X-CSRFToken': Cookies.get ( 'csrftoken' )
		}
	};
}
