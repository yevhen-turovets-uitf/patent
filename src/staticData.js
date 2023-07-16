import {
  openApiRoute,
  officialBulletinsRoute,
  openRegistersRoute,
  objectionsRoute,
  objectionsRegisterRoute,
  solutionsRoute,
  extendedSearchRoute,
  classifiersRoute,
  productClassifiersRoute,
  productClassifiersVersionRoute,
  productClassifiersVienneseRoute,
  productClassifiersIdentifierRoute,
  industrialClassifiersRoute,
  industrialClassifiersVersionsRoute,
  dutiesRoute,
  workInfoRoute,
  chamberInfoRoute,
  classifiersLink,
  patentsLink,
  trademarksLink,
  originPlaceLink,
  industrialLink,
  patentAnaliticsLink,
  glossaryLink,
  faqLink,
  consultationsIssuesLink
} from 'urls';
import {
	groupShield1,
	groupShield2,
	groupShield3,
  shield6,
  shield7,
	shield8
} from 'images';

export const objectsTypesSelectOptions = [
  { label: 'Все', value: 'all' },
  { label: 'Изобретение', value: 'invention' },
  { label: 'Полезная модель', value: 'utilityModel' },
  { label: 'Промышленный образец', value: 'industrialModel' },
  { label: 'Товарный знак', value: 'trademark' },
  { label: 'Общеизвестный товарный знак', value: 'wellKnownTrademark' },
  { label: 'Наименование места происхождения товаров', value: 'goodsOrigin' },
  { label: 'Географическое указание', value: 'geographicalIndication' },
  { label: 'Программа для ЭВМ', value: 'computerProgram' },
  { label: 'База данных', value: 'database' },
  { label: 'Топология интегральных микросхем', value: 'integratedCircuits' }
];

export const patentAttorneysDescription = [
  'Патентный поверенный осуществляет ведение дел с федеральным органом исполнительной власти по интеллектуальной собственности по поручению заявителей, правообладателей и иных заинтересованных граждан и юридических лиц, постоянно проживающих (для граждан) или имеющих место нахождения (для юридических лиц) в Российской Федерации и за ее пределами, если международным договором Российской Федерации или законодательством Российской Федерации не предусмотрено иное.',
  'Отношения, связанные с деятельностью патентных поверенных на территории РФ, требования к патентным поверенным, порядок их аттестации и регистрации, а также обязанности и ответственность определяются и регулируются Федеральным законом от 30.12.08 № 316-ФЗ в соответствии с Гражданским Кодексом РФ.'
];

export const searchCardLinks = [
  {
    to: dutiesRoute,
    text: 'Пошлины, начисления',
    image: shield6,
    route: true
  },
  {
    to: workInfoRoute,
    text: 'Информация о делопроизводстве',
    image: shield7,
    route: true
  },
  {
    to: chamberInfoRoute,
    text: 'Информация палаты по патентным спорам',
    image: shield7,
    route: true
  },
  {
    to: '',
    text: 'Выписка из государственного реестра',
    image: shield7
  }
];

export const alphabet = ['А','Б','В','Г','Д','Е','Ё','Ж','З','И','К','Л','М','Н','О','П','Р','С','Т','У','Ф','Х','Ц','Ч','Ш','Щ','Э','Ю','Я']

export const industrialClassifiersLinks = [
  {
    type: industrialClassifiersVersionsRoute,
    to: industrialClassifiersVersionsRoute,
    text: 'Версии Международной классификации промышленных образцов',
    route: true
  }
];

export const industrialClassifiersDescription = [
  `13-я редакция Международной классификации промышленных образцов, МКПО-13, вступила в силу 1 января 2021 года. За двухлетний период пересмотра МКПО в её текст внесли более 300 изменений: введение новых наименований промышленных образцов, переносы в другие подклассы и аннулирование существующих наименований промышленных образцов.`,
  `Эталонная версия МКПО опубликована на английском и французском языках. Вы можете посмотреть официальную публикацию на сайте ВОИС.`,
  `Текст рубрик и примечаний в схеме МКПО на сайте ФИПС сопровождается указанием той версии МКПО, в которой он был изменен в последний раз или вновь введен. Текущая версия МКПО обозначается номером «13» в квадратных скобках.`,
  `Локарнское соглашение о Международной классификации промышленных образцов было принято 8 октября 1968 года дипломатической конференцией в г. Локарно, Швейцария. На конференции присутствовали все страны-участницы Парижской конвенции по охране промышленной собственности (далее «Локарнское соглашение», «Локарнская классификация»). Сегодня в Локарнском Соглашении участвуют 59 стран.`,
  `Локарнская классификация состоит из:
  перечня классов и подклассов;
  алфавитного перечня наименований изделий, в котором и промышленные образцы объединены с указанием соответствующих им классов и подклассов;
  пояснительных примечаний.`,
  `В соответствии со статьёй 2(3) Локарнского соглашения, ведомства промышленной собственности каждой контактирующей страны должны включать номера классов Локарнской классификации, к которым принадлежат промышленные образцы, в официальные документы для депозита, регистрации промышленных образцов и в официальные публикации. Рекомендации Комитета экспертов определяют, как следует указывать классы и подклассы в перечисленных документах и публикациях.`
];

export const productClassifiersDescription = {
  title: 'Международная классификация товаров и услуг для регистрации знаков',
  subtitle: 'Одиннадцатая редакция, издание 5-е',
  paragraphs: [
    `Перечень наименований товаров и услуг представлен в трехъязычном варианте: русский, английский, французский.`,
    `В трехъязычном варианте наименования товаров и услуг располагаются в порядке возрастания базового номера. В русскоязычном каждое наименование товара или услуги сопровождается наименованиями на английском и французском языках в соответствии с официальными изданиями ВОИС.`,
    `Если у одного и того же товара и услуги несколько наименований, то они приводятся через знак косой черты «/».`
  ]
};

export const productClassifiersLinks = [
  {
    type: productClassifiersVersionRoute,
    to: productClassifiersVersionRoute,
    text: 'Версии Международной классификации товаров и услуг(МКТУ)',
    route: true
  },
  {
    type: productClassifiersVienneseRoute,
    to: productClassifiersVienneseRoute,
    text: 'Международная классификация изобразительных элементов товарных знаков (Венская классификация)',
    route: true
  },
  {
    type: productClassifiersIdentifierRoute,
    to: productClassifiersIdentifierRoute,
    text: 'Лексико-семантический идентификатор товаров и услуг',
    route: true
  }
];

export const classifiersLinksData = [
  {
    link: {
      to: classifiersLink,
      text: 'Международная патентная классификация',
      route: false
    },
    image: groupShield1
  },
  {
    link: {
      to: industrialClassifiersRoute,
      text: 'Международная классификация промышленных образцов',
      route: true
    },
    image: shield8
  },
  {
    link: {
      to: productClassifiersRoute,
      text: 'Международная классификация товаров и услуг',
      route: true
    },
    image: groupShield2
  }
];

export const officialBulletinsMainData = [
  {
    image: groupShield1,
    link: `${officialBulletinsRoute}/programs`,
    rows: [
      {
        text: 'База данных'
      },
      {
        text: 'Программа	для ЭВМ'
      },
      {
        text: 'Топология интегральных микросхем'
      }
    ]
  },
  {
    image: groupShield2,
    link: `${officialBulletinsRoute}/marks`,
    rows: [
      {
        text: 'Товарные знаки'
      },
      {
        text: 'Знаки обслуживания'
      },
      {
        text: 'Наименование места происхождения товаров'
      }
    ]
  },
  {
    image: groupShield3,
    link: `${officialBulletinsRoute}/models`,
    rows: [
      {
        text: 'Полезные модели'
      },
      {
        text: 'Изобретения'
      }
    ]
  },
  {
    image: shield8,
    link: `${officialBulletinsRoute}/industrial`,
    rows: [
      {
        text: 'Промышленные образцы'
      }
    ]
  }
];

export const officialBulletinsSideData = [
  {
    title: 'Международные классификаторы',
    links: [
      {
        to: classifiersLink,
        text: 'Международная патентная классификация',
        route: false
      },
      {
        to: industrialClassifiersRoute,
        text: 'Международная классификация промышленных образцов',
        route: true
      },
      {
        to: productClassifiersRoute,
        text: 'Международная классификация товаров и услуг',
        route: true
      }
    ]
  },
  {
    title: 'Информация палаты по патентным спорам',
    links: [
      {
        to: objectionsRoute,
        text: 'Возражения, заявления',
        route: true
      },
      {
        to: objectionsRegisterRoute,
        text: 'Реестр возражений и заявлений',
        route: true
      },
      {
        to: solutionsRoute,
        text: 'Решения',
        route: true
      }
    ]
  },
  {
    title: 'API для доступа к патентной информации ФИПС',
    links: [
      {
        to: openApiRoute,
        text: 'Открытые API',
        route: true
      }
    ]
  },
];

export const officialBulletinsDetailedType = {
  programs: 'базы данных, программа ЭВМ, топологии интегральных микросхем',
  marks: 'товарные знаки, знаки обслуживания, географические указания мест происхождения товаров',
  models: 'полезные модели, изобретения',
  industrial: 'промышленные образцы'
};

export const officialBulletinsDetailedLinks = [
  {
    to: classifiersLink,
    text: 'Международная патентная классификация',
    route: false
  },
  {
    to: industrialClassifiersRoute,
    text: 'Международная классификация промышленных образцов',
    route: true
  },
  {
    to: productClassifiersRoute,
    text: 'Международная классификация товаров и услуг',
    route: true
  },
  {
    to: objectionsRoute,
    text: 'Возражения и заявления',
    route: true
  },
  {
    to: objectionsRegisterRoute,
    text: 'Реестр возражений и заявлений',
    route: true
  },
  {
    to: solutionsRoute,
    text: 'Решения',
    route: true
  },
  {
    to: openApiRoute,
    text: 'API для доступа к патентной информации ФИПС',
    route: true
  }
];

export const openRegistersTableData = [
	{
		title: 'Изобретения',
		objectLinks: [
			{
				text: 'Реестр изобретений',
				searchConfig: {}
			}
		],
		statementLinks: [
			{
				text: 'Реестр заявок на выдачу патента на изобретение',
				searchConfig: {}
			}
		]
	},
	{
		title: 'Полезные модели',
		objectLinks: [
			{
				text: 'Полезные модели',
				searchConfig: {}
			}
		],
		statementLinks: [
			{
				text: 'Реестр заявок на выдачу патента на полезную модель',
				searchConfig: {}
			}
		]
	},
	{
		title: 'Промышленные образцы',
		objectLinks: [
			{
				text: 'Реестр промышленных образцов',
				searchConfig: {}
			}
		],
		statementLinks: [
			{
				text: 'Реестр заявок на выдачу патента на промышленный образец',
				searchConfig: {}
			}
		]
	},
	{
		title: 'Товарные знаки',
		objectLinks: [
			{
				text: 'Реестр товарных знаков и знаков обслуживания',
				searchConfig: {}
			},
			{
				text: 'Реестр общеизвестных товарных знаков',
				searchConfig: {}
			},
			{
				text: 'Реестр товарных знаков по международным регистрациям, по которым имеются сведения о зарегистрированных на территории Российской Федерации распоряжениях исключительным правом по договорам о предоставлении права использования',
				searchConfig: {}
			}
		],
		statementLinks: [
			{
				text: 'Реестр заявок на регистрацию товарного знака и знака обслуживания',
				searchConfig: {}
			}
		]
	},
	{
		title: 'Географические указания и наименования места происхождения товаров',
		objectLinks: [
			{
				text: 'Реестр географических указаний и наименований мест происхождения товаров',
				searchConfig: {}
			}
		],
		statementLinks: [
			{
				text: 'Реестр заявок на регистрацию географического указания и наименования места происхождения товара',
				searchConfig: {}
			}
		]
	},
	{
		title: 'Программы для ЭВМ, базы данных и топологии интегральных микросхем',
		objectLinks: [
			{
				text: 'Реестр программ для ЭВМ',
				searchConfig: {}
			},
			{
				text: 'Реестр баз данных',
				searchConfig: {}
			},
			{
				text: 'Реестр топологий интегральных микросхем',
				searchConfig: {}
			}
		],
		statementLinks: []
	},
];

export const openApiLinks = [
  {
    to: '/docs/Открытые_API_ГИС_Онлайн_Роспатент.docx',
    text: 'Описание функций API ГИС Онлайн Роспатент'
  },
  {
    to: '/docs/Открытые_API_ГИС_ЕГР.docx',
    text: 'Описание функций API ГИС ЕГР'
  },
  {
    to: '/docs/Спецификации_формальных_проверок.docx',
    text: 'Описание основных формальных проверок'
  }
];

export const searchObjectTypeOptions = [
  { label: 'Все объекты', value: 'all' },
  { label: 'Товарный знак', value: '1' },
  { label: 'Общеизвестный товарный знак', value: '2' },
  { label: 'Место происхождения', value: '3' },
  { label: 'Изобретение', value: '5' },
  { label: 'Полезные модели', value: '6' },
  { label: 'Промышленный образец', value: '7' },
  { label: 'Программа для ЭВМ', value: '8' },
  { label: 'База данных', value: '9' },
  { label: 'Топология интегральных микросхем', value: '10' },
  { label: 'Географическое указание', value: '12' }
];

export const searchDocumentTypeOptions = [
  { label: 'Все документы', value: 'all' },
  { label: 'Заявка', value: '1' },
  { label: 'Свидетельство о регистрации или патент', value: '2' }
];

export const searchStatusOptions = [
  { label: 'Все статусы', value: 'all' },
  { label: 'Получена', value: '1' },
  { label: 'Формальная экспертиза', value: '2' },
  { label: 'Экспертиза образца или по существу', value: '3' },
  { label: 'Ожидание регистрации', value: '4' },
  { label: 'Отклонена', value: '5' },
  { label: 'Отозвана', value: '6' },
  { label: 'Действует', value: '10' },
  { label: 'Аннулирование регистрации', value: '11' },
  { label: 'Прекращение правой охраны', value: '12' }
];

export const statementModalFields = {
  titles: {
    validationDraftError: 'Обязательные поля остались незаполненными.\nХотите сохранить черновик?',
    validationDraftSuccess: 'Вы сохранили черновик',
    validationErrors: 'Обязательные поля остались незаполненными.\nХотите сохранить черновик?',
    ehdError: 'Ошибка',
    pdfSignErrors: 'Результат проверки заявления',
    externalServiceError: 'Ошибка'
  },
  button1: {
    validationDraftError: 'Сохранить и выйти в ЛК',
    validationDraftErrorReferred: 'Сохранить и перейти к Заявлению',
    validationDraftSuccess: 'Перейти в Личный кабинет',
    validationDraftSuccessReferred: 'Перейти к Заявлению',
    validationErrors: 'Сохранить и выйти в ЛК',
    ehdError: 'Сохранить черновик и выйти в ЛК',
    sfpResults: 'Отправить Заявление',
    sfpResultsUin: 'Сформировать УИН',
    externalServiceError: 'Перейти к Заявлению'
  },
  button2: {
    validationDraftError: 'Сохранить и остаться в Заявке',
    validationDraftErrorReferred: 'Сохранить и остаться в Документе',
    validationDraftSuccess: 'Продолжить редактирование',
    validationErrors: 'Сохранить и остаться в Заявке',
    validationErrorsReferred: 'Сохранить и остаться в Документе',
    ehdError: 'Продолжить редактирование',
    pdfSignErrors: 'Продолжить редактирование',
    sfpResults: 'Продолжить редактирование',
    sfpResultsUin: 'Продолжить редактирование',
    feeLinks: 'Оплатить позже'
  },
  onClick1: {
    validationDraftError: 'lk',
    validationDraftErrorReferred: 'statement',
    validationDraftSuccess: 'lk',
    validationDraftSuccessReferred: 'statement',
    validationErrors: 'lk',
    ehdError: 'lk',
    sfpResults: 'statusAndBack',
    sfpResultsUin: 'generate',
    externalServiceError: 'close'
  },
  onClick2: {
    validationDraftError: 'close',
    validationDraftErrorReferred: 'statement',
    validationDraftSuccess: 'close',
    validationErrors: 'close',
    validationErrorsReferred: 'statement',
    ehdError: 'close',
    pdfSignErrors: 'close',
    sfpResults: 'closeAcception',
    sfpResultsUin: 'closeAcception',
    feeLinks: 'closeAndBack'
  }
};

export const openDataMainLinks = [
  {
    type: 'official-bulletins',
    to: officialBulletinsRoute,
    text: 'Официальные бюллетени',
    route: true
  },
  {
    type: 'classifiers',
    to: classifiersRoute,
    text: 'Международные классификаторы',
    route: true
  },
  {
    type: 'analytics',
    to: patentAnaliticsLink,
    text: 'Патентная аналитика',
    route: false
  },
  {
    type: 'open-registers',
    to: openRegistersRoute,
    text: 'Открытые реестры',
    route: true
  },
  {
    type: 'extended-search',
    to: extendedSearchRoute,
    text: 'Расширенный поиск информации',
    route: true
  },
  {
    type: 'open-api',
    to: openApiRoute,
    text: 'Открытые API',
    route: true
  }
];

export const extendedSearchData = [
  {
    image: groupShield1,
    links: [
      {
        to: patentsLink,
        text: 'Изобретения',
        route: false
      },
      {
        to: patentsLink,
        text: 'Полезные модели',
        route: false
      },
      {
        to: patentsLink,
        text: 'Программы для ЭВМ',
        route: false
      },
      {
        to: patentsLink,
        text: 'Топологии интегральных микросхем',
        route: false
      },
      {
        to: patentsLink,
        text: 'Базы данных',
        route: false
      },
    ]
  },
  {
    image: groupShield2,
    links: [
      {
        to: trademarksLink,
        text: 'Товарные знаки',
        route: false
      },
      {
        to: trademarksLink,
        text: 'Общеизвестные товарные знаки',
        route: false
      },
      {
        to: originPlaceLink,
        text: 'Географические указания',
        route: false
      },
      {
        to: originPlaceLink,
        text: 'Наименование места происхождения товаров',
        route: false
      },
      {
        to: industrialLink,
        text: 'Промышленные образецы',
        route: false
      },
    ]
  }
];

export const helpLinksData = [
  {
    title: 'Руководство пользователя\nЛичного кабинета',
    icon: 'base-icon-book',
    href: '/docs/ЦЭ_ОЛР_1_ЭД_РП_Руководство_пользователя_v1.pdf'
  },
  {
    title: 'Глоссарий',
    icon: 'base-icon-letter-a',
    href: glossaryLink
  },
  {
    title: 'Ответы на часто задаваемые вопросы',
    icon: 'base-icon-question',
    href: faqLink
  },
  {
    title: 'Консультации по актуальным вопросам пользователей',
    icon: 'base-icon-book',
    href: consultationsIssuesLink
  }
];