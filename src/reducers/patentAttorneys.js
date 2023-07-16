import { createActions, handleActions } from 'redux-actions';
import * as actionTypes from 'actionTypes';

const defaultState = {
	mainForm: {
    fio: '',
    registerNumber: '',
    organizationName: '',
    region: null,
    specialization: null,
    language: null
  },
  attorneys: {
    result_count: '13960',
    current_page: 1,
		page_count: 10,
    list: [
      {
        attorney_name: 'Абакумов Петр Николаевич',
        attorney_register_number: '1713',
        attorney_specialization: 'Программы для ЭВМ, БД, ТИМС',
        attorney_phone: '(495)556-77-19; (495)557-06-00',
        attorney_mail: 'E-mail: APN1700@yandex.ru',
        attorney_language: 'английский'
      },
      {
        attorney_name: 'Абдураимова Дженнет Агамурадовна',
        attorney_register_number: '1714',
        attorney_specialization: 'Программы для ЭВМ, БД, ТИМС',
        attorney_phone: '(495)556-77-19; (495)557-06-00',
        attorney_mail: 'E-mail: APN1700@yandex.ru',
        attorney_language: 'английский'
      },
      {
        attorney_name: 'Абиралов Николай Карпович',
        attorney_register_number: '1715',
        attorney_specialization: 'Программы для ЭВМ, БД, ТИМС',
        attorney_phone: '(495)556-77-19; (495)557-06-00',
        attorney_mail: 'E-mail: APN1700@yandex.ru',
        attorney_language: 'английский'
      },
      {
        attorney_name: 'Аблакова Адиля Эриковна',
        attorney_register_number: '1716',
        attorney_specialization: 'Программы для ЭВМ, БД, ТИМС',
        attorney_phone: '(495)556-77-19; (495)557-06-00',
        attorney_mail: 'E-mail: APN1700@yandex.ru',
        attorney_language: 'английский'
      },
      {
        attorney_name: 'Аблогина Наталья Владимировна',
        attorney_register_number: '1717',
        attorney_specialization: 'Программы для ЭВМ, БД, ТИМС',
        attorney_phone: '(495)556-77-19; (495)557-06-00',
        attorney_mail: 'E-mail: APN1700@yandex.ru',
        attorney_language: 'английский'
      },
      {
        attorney_name: 'Абраменко Олег Игоревич',
        attorney_register_number: '1718',
        attorney_specialization: 'Программы для ЭВМ, БД, ТИМС',
        attorney_phone: '(495)556-77-19; (495)557-06-00',
        attorney_mail: 'E-mail: APN1700@yandex.ru',
        attorney_language: 'английский'
      },
      {
        attorney_name: 'Абрамов Алексей Адамович',
        attorney_register_number: '1719',
        attorney_specialization: 'Программы для ЭВМ, БД, ТИМС',
        attorney_phone: '(495)556-77-19; (495)557-06-00',
        attorney_mail: 'E-mail: APN1700@yandex.ru',
        attorney_language: 'английский'
      },
      {
        attorney_name: 'Абубакиров Сергей Рустэмович',
        attorney_register_number: '1720',
        attorney_specialization: 'Программы для ЭВМ, БД, ТИМС',
        attorney_phone: '(495)556-77-19; (495)557-06-00',
        attorney_mail: 'E-mail: APN1700@yandex.ru',
        attorney_language: 'английский'
      },
      {
        attorney_name: 'Аваков Александр Валерьянович',
        attorney_register_number: '1721',
        attorney_specialization: 'Программы для ЭВМ, БД, ТИМС',
        attorney_phone: '(495)556-77-19; (495)557-06-00',
        attorney_mail: 'E-mail: APN1700@yandex.ru',
        attorney_language: 'английский'
      },
      {
        attorney_name: 'Авакян Ани Вараздатовна',
        attorney_register_number: '1722',
        attorney_specialization: 'Программы для ЭВМ, БД, ТИМС',
        attorney_phone: '(495)556-77-19; (495)557-06-00',
        attorney_mail: 'E-mail: APN1700@yandex.ru',
        attorney_language: 'английский'
      }
    ]
  },
  waiter: undefined
};

export const actions = createActions ({
  [ actionTypes.PATENT_ATTORNEYS_SEARCH_REQUEST ]: ( params ) => ({ params, waiter: true }),
	[ actionTypes.PATENT_ATTORNEYS_SEARCH ]: ( result ) => ({ result }),
	[ actionTypes.PATENT_ATTORNEYS_CHANGE_SEARCH_FORM ]: ( value ) => ({ value }),
  [ actionTypes.PATENT_ATTORNEYS_CLEAR_SEARCH_FORM ]: () => ({
    mainForm: {
      fio: '',
      registerNumber: '',
      organizationName: '',
      region: null,
      specialization: null,
      language: null
    },
    attorneys: {
      result_count: undefined,
      current_page: undefined,
      page_count: undefined,
      list: undefined
    }
  }),
});

export default handleActions (
	{
    [ actionTypes.PATENT_ATTORNEYS_SEARCH_REQUEST ]: ( state, { payload: { waiter } } ) => ({
			...state,
			waiter
		}),
		[ actionTypes.PATENT_ATTORNEYS_SEARCH ]: ( state, { payload: { result } } ) => ({
			...state,
			attorneys: {
				...state.attorneys,
				...result
			},
			waiter: false
		}),
		[ actionTypes.PATENT_ATTORNEYS_CHANGE_SEARCH_FORM ]: ( state, { payload } ) => ({ 	
      mainForm: {
        ...state.mainForm,
        ...payload.value
      }
    }),
    [ actionTypes.PATENT_ATTORNEYS_CLEAR_SEARCH_FORM ]: ( state, { payload: { mainForm, attorneys } } ) => ({
			...state,
      mainForm: {
				...state.mainForm,
				...mainForm
			},
      attorneys: {
        ...state.attorneys,
        ...attorneys
      }
    }),
	},
	defaultState
);
