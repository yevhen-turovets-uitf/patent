const sectionOptions = {
	'приложения': {
		isAttachment: true,
		hideAddButton: true
	},
	'приложение': {
		isAttachment: true,
		hideAddButton: true
	},
	'электронная подпись': {
		isElectronicSignature: true,
		hideAddButton: true
	},
	'электронная подпись третьих лиц': {
		isThirdPartySignature: true,
		hideAddButton: true
	},
	'отправка заявления': {
		hideAddButton: true,
		isStatementSubmission: true
	}
};

const addButtonTitles = {
	'заявитель': 'Добавить заявителя',
	'рег. данные': 'Добавить данные по объекту',
	'сведения об изменениях': 'Добавить изменение',
	'исправления': 'Добавить исправление',
	'дополнения': 'Добавить',
	'представитель': 'Добавить представителя',
	'правообладатель': 'Добавить правообладателя',
	'лицензиат': 'Добавить лицензиата',
	'сублицензиат': 'Добавить сублицензиата',
	'плательщик': 'Добавить плательщика',
	'пользователь': 'Добавить пользователя',
	'вторичный пользователь': 'Добавить вторичного пользователя',
	'сублицензиар': 'Добавить сублицензиара',
	'вторичный правообладатель': 'Добавить вторичного правообладателя',
	'залогодатель': 'Добавить залогодателя',
	'залогодержатель': 'Добавить залогодержателя',
	'автор': 'Добавить автора',
	'правопреемник': 'Добавить правопреемника',
	'приобретатель': 'Добавите приобретателя',
	'отметки об оплате': false,
	'контактные данные': false,
	'приложения': false,
	'сведения о договоре': false,
	'данные о залоге': false,
	'данные о договоре': false,
	'контактная информация для третьих лиц': false,
	'идентификация платежа': false,
	'реквизиты для возврата средств': false,
	'электронная подпись третьих лиц': false
};

const customAddButtonIcons = {
	'рег. данные': 'file-done',
	'сведения об изменениях': 'file-done',
	'исправления': 'file-done',
	'дополнения': 'file-done'
};

export default Object.keys ( addButtonTitles ).reduce (
	( res, name ) => ({
		...res,
		[ name ]: {
			...res[ name ],
			addButtonTitle: addButtonTitles[ name ] || false,
			addButtonIcon: customAddButtonIcons[ name ] || 'person-add',
			hideAddButton: addButtonTitles[ name ] === false
		}
	}),
	sectionOptions
);
