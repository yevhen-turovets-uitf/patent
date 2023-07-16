/* eslint-disable eqeqeq */
import { saveAs } from 'file-saver';
import { conformToMask } from 'react-text-mask';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import sectionOptions from 'sectionOptions';
import textMasks from 'textMasks';
import moment from 'moment';

const defaultObj = {},
	fieldTypes = new Set ([ 'TEXT', 'TEXT_AREA', 'FILE', 'DIGITAL_SIGNATURE', 'CHECK_BOX', 'SWITCH', 'RADIO', 'DATE', 'DATE_TIME', 'FIELD' ]),
	isField = type => fieldTypes.has ( type );


export function getNormalizedId ( id, type, postfix = '' )
{
	if ( isField ( type ) ) return String ( id );

	const resPostfix = [ 'FILLED_SECTION', 'SECTION' ].indexOf ( type ) !== -1 ? '' : postfix;

	return `${ type }(id:${ id })${ resPostfix }`;
}

export function saveData ( data, filename )
{
	const blob = new Blob ( [ data ], { type: 'octet/stream' } );

	saveAs ( blob, filename );
}

export function objToURIParamString ( params )
{
	const pairs = [];

	for ( let name in params )
	{
		let value = params[ name ];

		if ( value !== undefined && value !== '' )
		{
			if ( Array.isArray ( value ) ) value = value.join ( ',' );
			else if ( typeof value === 'object' ) value = JSON.stringify ( value );

			pairs.push ( `${ name }=${ value }` );
		}
	}

	return pairs.length ? '?' + pairs.join ( '&' ) : '';
}

export function stripTags ( html )
{
	var doc = new DOMParser().parseFromString ( html, 'text/html' );

	return doc.body.textContent.trim() || '';
}

export function getSectionOptions ( section_type )
{
	return sectionOptions[ String ( section_type ).trim().toLowerCase() ] || defaultObj;
}

export function getStatusName ( status )
{
	switch ( status )
	{
		case 'DRAFT':
			return 'Черновик';
		case 'PROCESSING':
			return 'В обработке';
		case 'POSHLINA':
			return 'Проверка уплаты пошлин';
		case 'PROVERKI':
			return 'Формальные проверки';
		case 'EPOS':
			return 'Ожидание запроса на ЭпоС';
		case 'EPOS_EZO':
			return 'ЭпоС/ЭЗО';
		case 'EGR':
			return 'Регистрация в ЕГР';
		case 'SAVING':
			return 'На проверке';
		default:
			return 'Статус'
	}
}

export function mapNormalizedFields ( normalizedId, normalized, callback = field => field, res = [], _break = { status: false } )
{
	const block = normalized[ normalizedId ];

	if ( !block || _break.status ) return res;

	let filteredBlocks;

	const { type, blocks = [], value, policy } = block;

	if ( isField ( type ) )
	{
		const row = callback ( block, normalized, () => _break.status = true );

		if ( row !== null ) res.push ( row );

		if ( _break.status ) return res;
	}

	if ( type === 'SWITCH' && ( value === undefined || policy === 'GET_VALUE_FROM_SECTION' ) ) return res;
	else if ( type === 'CHECK_BOX' && ( !value || value === 'False' ) ) return res;
	else if ( type === 'SWITCH' || type === 'RADIO' )
	{
		filteredBlocks = blocks.filter (
			id => String ( normalized[ id ].id ) === String ( value )
		);
	}

	return ( filteredBlocks || blocks ).reduce (
		( res, normalizedId ) => mapNormalizedFields ( normalizedId, normalized, callback, res, _break ),
		res
	);
}

export function getCard ( normalizedFilledSectionId, normalized, defaultTitle )
{
	const section = normalized[ normalizedFilledSectionId ];

	if ( !section || section.type !== 'FILLED_SECTION' ) return null;

	const titleArr = [],
		callback = ( field, normalized ) => {
			const { title } = field,
				value = getValueFromField ( field, normalized );

			if ( !value ) return null;

			if ( field.display_in_switch ) titleArr.push ( value );

			return `${ title }: ${ value }`;
		},
		rows = mapNormalizedFields ( normalizedFilledSectionId, normalized, callback ),
		title = titleArr.join ( ' ' ) || ( `${ defaultTitle }${ defaultTitle && ': ' }не заполнены поля` );

	return { title, rows };
}

export function getChildrens (normalized, parent, type)  {
	const parentId = parent.split(':')[1]
	let childs = []
	for(const id in normalized) {
		const ids = id.split(':')
		if(ids.length > 1 && ids[1] == parentId) {
			const el = normalized[id]
			if (type) {
				if (type == el.type) {
					childs.push(normalized[id])
				} 
			} else {
				childs.push(normalized[id])
			}
		}
	}

	return childs
}

export function getValueFromField ( { type, value, mask, title, policy, blocks }, normalized )
{
	if ( type === 'SWITCH' && policy === 'GET_VALUE_FROM_SECTION' )
	{
		const index = blocks.findIndex (
			id => String ( normalized[ id ].id ) === String ( value )
		);

		if ( index === -1 ) return null;

		return getStringFromFieldValuesByFlag (
			blocks[ index ],
			normalized,
			'display_in_switch',
			`${ title } ${ index + 1 }`
		);
	}
	else if ( type === 'SWITCH' || type === 'RADIO' )
	{
		return ( normalized[
			blocks.find (
				id => String ( normalized[ id ].id ) === String ( value )
			)
		] || {} ).title;
	}
	else if ( type === 'DATE' ) return value.split ( '-' ).reverse().join ( '.' );
	else if ( mask === 'PHONE' ) return formatPhoneNumberIntl ( value );
	else if ( textMasks[ mask ] )
	{
		return conformToMask ( value, textMasks[ mask ].mask, textMasks.options ).conformedValue;
	}
	else if ( type === 'CHECK_BOX' ) return value === 'True' || value === true ? 'Да' : 'Нет';
	else return value;
}

export function getFieldValuesByFlag ( normalizedId, normalized, flag )
{
	return mapNormalizedFields (
		normalizedId,
		normalized,
		( field, normalized ) => ( field[ flag ] && getValueFromField ( field, normalized ) ) || null
	);
}

export function getStringFromFieldValuesByFlag ( normalizedId, normalized, flag, defaultValue = '' )
{
	return getFieldValuesByFlag ( normalizedId, normalized, flag ).join ( ' ' ) || ( `${ defaultValue }${ defaultValue && ': не заполнены поля' }` );
}

export function scrollWindowToElement ( elem )
{
	try {
		window.scrollTo ({
			top: elem.getBoundingClientRect().y + window.scrollY - 60,
			behavior: 'smooth'
		});
	}
	catch ( error )
	{
		console.error ( error );
	}
}

export function parseMessagesId ( str )
{
	const { groups: { fieldId, sectionId } = {} } = /(?<fieldId>^\d+(?::\d+)?)$|^section_type_(?<sectionId>\d+)$/.exec ( str ) || {},
		type = sectionId ? 'SECTION' : 'FIELD',
		normalizedId = getNormalizedId ( sectionId || fieldId, type )

	return {
		normalizedId,
		type,
		errorName: sectionId ? 'external_sections_error' : 'error'
	};
}

export function getEmptyLabel ( title, i )
{
	return `${ title } ${ i + 1 }: не заполнены поля`;
}

export function getDate ( date )
{
	const current = moment ( date ),
		now = moment(),
		isToday = current.isSame (
			now.clone().startOf ( 'day' ),
			'd'
		),
		isYesterday = !isToday && current.isSame (
			now.clone().subtract ( 1, 'days' ).startOf ( 'day' ),
			'd'
		);

	return current.format ( isToday ? 'HH:mm' : isYesterday ? 'Вчера' : 'DD.MM.YYYY' );
}

export const setOpenDataLocalState = (fieldName, fieldData) => {
	const state = JSON.parse(localStorage.getItem(fieldName));
	const newData = { ...state, ...fieldData };

	localStorage.setItem(fieldName, JSON.stringify(newData));
	localStorage.setItem(`${fieldName}BoundaryDate`, `${Date.now() + 1800000}`);
}

export const removeOpenDataLocalState = (fieldName) => {
	localStorage.removeItem(fieldName);
	localStorage.removeItem(`${fieldName}BoundaryDate`);
}

export const getOpenDataLocalState = (fieldName) => {
	const BoundaryDate = localStorage.getItem(`${fieldName}BoundaryDate`);

	if (!!BoundaryDate && BoundaryDate - Date.now() > 0) {
		return JSON.parse(localStorage.getItem(fieldName));
	}

	removeOpenDataLocalState(fieldName);
}