import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Tooltip from '@material-ui/core/Tooltip';
import Collapse from '@material-ui/core/Collapse';
import { withStyles } from "@material-ui/core/styles";
import validator from 'validator';
import actions from 'actions';
import {
  openDataRoute,
  openRegistersRoute
} from 'urls';
import {
  PageWithSideMenu,
  SelectInput,
  Breadcrumbs,
  CustomDrawer,
  OpenDataSideMenu,
  SearchButton,
  SearchTemplateListModal,
  SearchTemplateModal
} from 'components';
import MobileFilters from './MobileFilters';
import DesktopFilters from './DesktopFilters';
import ListElement from './ListElement';
import {
  filters,
  findQuestion,
  deleteFilter
} from 'images';
import {
  searchObjectTypeOptions,
  searchDocumentTypeOptions
} from 'staticData';

export default React.memo(Search);

function Search() {
  const isDesktop = useMediaQuery({
    query: '(min-width: 992px)'
  }),
  isSmallScreen = useMediaQuery({
    query: '(max-width: 768px)'
  }),
  dispatch = useDispatch(),
  crumbs = [
    { to: '/', title: 'Онлайн Роспатент' },
    { to: openDataRoute, title: 'Открытые данные' },
    { to: openRegistersRoute, title: 'Открытые реестры' },
    'Поиск по реестру'
  ],
  { mainForm: {
    group,
    objectType,
    documentType,
    registrationPeriod,
    publicationPeriod
  } } = useSelector ( ({ openRegisters }) => openRegisters ),
  auth = useSelector ( ({ auth }) => auth ),
  [filtersPanel, setFiltersPanel] = useState(false),
  [templateModal, setTemplateModal] = useState(false),
  [templateListModal, setTemplateListModal] = useState(false),
  [tooltip, setTooltip] = useState(false),
  [drawer, setDrawer] = useState(false),
  [filter, setFilter] = useState('date'),
  [templateModalInput, setTemplateModalInput] = useState(''),
  onChangeGroup = useCallback (
    e => {
      if(validator.isNumeric(e.target.value, { no_symbols: true }) || e.target.value === '') {
        dispatch ( actions.searchMainForm ({ group: e.target.value }))
      }
    },
    [ dispatch ]
  ),
  onChangeObjectType = useCallback (
    e => dispatch ( actions.searchMainForm ({ objectType: e.target.value })),
    [ dispatch ]
  ),
  onChangeDocumentType = useCallback (
    e => dispatch ( actions.searchMainForm ({ documentType: e.target.value })),
    [ dispatch ]
  ),
  onChangeRegistrationPeriod = useCallback (
    value => dispatch ( actions.searchMainForm ({
      registrationPeriod: {
        start: registrationPeriod.start,
        end: registrationPeriod.end,
        ...value
      }
    })),
    [dispatch, registrationPeriod.end, registrationPeriod.start]
  ),
  onChangePublicationPeriod = useCallback (
    value => dispatch ( actions.searchMainForm ({
      publicationPeriod: {
        start: publicationPeriod.start,
        end: publicationPeriod.end,
        ...value
      }
    })),
    [dispatch, publicationPeriod.end, publicationPeriod.start]
  ),
  onChangeStatus = useCallback (
    e => dispatch ( actions.searchMainForm ({ status: e.target.value })),
    [ dispatch ]
  ),
  onChangeCategoryIndex = useCallback (
    e => dispatch ( actions.searchMainForm ({ categoryIndex: e.target.value })),
    [ dispatch ]
  ),
  onClearFilters = useCallback (
    () => dispatch ( actions.searchClearMainForm ()),
    [ dispatch ]
  ),
  onSearch = useCallback (
    () => dispatch ( actions.egrSearchDocumentsRequest ({
      expression: {
        operator: 'and',
        operands: [
          {
            kind: 'simple',
            attributeName: 'DocType',
            attributeValue: '1',
            compareOperator: 'equal'
          },
          { kind: 'simple',
            attributeName: 'IsApplication',
            attributeValue: false,
            compareOperator: 'equal'
          },
        ]
      }
  })),
    [ dispatch ]
  ),
  onCancelDrawer = useCallback (
    () => setDrawer(false),
    []
  ),
  onCancelTooltip = useCallback (
    () => setTooltip(false),
    []
  ),
  onOpenDrawerOrTooltip = useCallback (
    () => isSmallScreen ? setDrawer(true) : setTooltip(true),
    [isSmallScreen]
  ),
  onOpenTemplateListModal = useCallback (
    () => {
      setTooltip(false);
      setDrawer(false);
      setTemplateListModal(true);
    },
    []
  ),
  onOpenTemplateModal = useCallback (
    () => {
      setTooltip(false);
      setDrawer(false);
      setTemplateModal(true);
    },
    []
  );

  return (
    <PageWithSideMenu
      className="search-page"
      menu={<OpenDataSideMenu/>}
    >
      <SearchTemplateModal
        onConfirm={() => setTemplateModal(false)}
        onCancel={() => setTemplateModal(false)}
        open={templateModal}
        inputState={templateModalInput}
        setInputState={setTemplateModalInput}
      />
      <SearchTemplateListModal
        onConfirm={() => setTemplateListModal(false)}
        onCancel={() => setTemplateListModal(false)}
        open={templateListModal}
        items={fakeModalItems}
      />
      <CustomDrawer
        onCancel={onCancelDrawer}
        open={drawer}
      >
        <div className="search-page__drawer-inner">
          <div className="search-page__drawer-title">Шаблоны запросов</div>
          <div 
            className="search-page__drawer-button"
            type="button"
            onClick={onOpenTemplateListModal}
          >
            Сохранённые запросы
          </div>
          <div
            className="search-page__drawer-button"
            type="button"
            onClick={onOpenTemplateModal}
          >
            Создать новый
          </div>
        </div>
      </CustomDrawer>
      <Breadcrumbs crumbs={crumbs} />
      <h4 className="section-title">Поиск по реестру</h4>
      <div className="search-page__inner"> 
        <div className="search-page__inputs-container"> 
          <div className="search-page__search-input search-page__search-input--first">
            <div className="input-row">
              <label>Номер ОИС или заявки</label>
              <input 
                className="style1"
                placeholder="Введите номер"
                value={group}
                onChange={onChangeGroup}
              />
            </div>
          </div>
          <div className="search-page__search-input search-page__search-input--second">
            <div className="input-row">
              <label>Вид объекта</label>
              <SelectInput
                mobileSize="big"
                placeholder="Все объекты" 
                options={searchObjectTypeOptions}
                value={objectType || ''}
                onChange={onChangeObjectType}
              />
            </div>
          </div>
          <div className="search-page__search-input search-page__search-input--third">
            <div className="input-row">
              <label>Тип документа</label>
              <SelectInput 
                mobileSize="big"
                placeholder="Все документы" 
                options={searchDocumentTypeOptions}
                value={documentType || ''}
                onChange={onChangeDocumentType} 
              />
            </div>
          </div>
          <div className="search-page__search-input search-page__search-input--fourth">
            <SearchButton {...{ onSearch }} />
          </div>
        </div>
        {isDesktop 
          ? (
            <Collapse
              in={filtersPanel}
              timeout={ 400 }
            >
              <DesktopFilters
                formActions={{
                  onChangeRegistrationPeriod,
                  onChangePublicationPeriod,
                  onChangeStatus,
                  onChangeCategoryIndex
                }}
              />
            </Collapse>
          )
          : (
            <MobileFilters 
              filtersPanel={filtersPanel}
              setFiltersPanel={setFiltersPanel}
              formActions={{
                onChangeGroup,
                onChangeObjectType,
                onChangeDocumentType,
                onChangeRegistrationPeriod,
                onChangePublicationPeriod,
                onChangeStatus,
                onChangeCategoryIndex,
                onClearFilters
              }}
            />
          )
        }
        <div className="search-page__info"> 
          <div 
            className="search-page__info-item"
            onClick={() => setFiltersPanel(!filtersPanel)}
          >
            <img src={filters} alt="#"/>
            <span>{filtersPanel ? 'Скрыть' : 'Показать'} фильтры</span>
          </div>
          {auth && (
            <ClickAwayListener onClickAway={onCancelTooltip}>
              <StyledTooltip
                onClose={onCancelTooltip}
                open={tooltip}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={
                  <>
                    <button
                      type="button"
                      className="search-page__tooltip-button"
                      onClick={() => setTemplateListModal(true)}
                    >
                      Сохранённые запросы
                    </button>
                    <button
                      type="button"
                      className="search-page__tooltip-button"
                      onClick={() => setTemplateModal(true)}
                    >
                      Создать новый
                    </button>
                  </>
                }
              >
                <div
                  className="search-page__info-item"
                  onClick={onOpenDrawerOrTooltip}
                >
                  <img src={findQuestion} alt="#"/>
                  <span>Шаблоны запросов</span>
                </div>
              </StyledTooltip>
            </ClickAwayListener>
          )}
          {!isSmallScreen &&
            <div 
              className="search-page__info-item"
              onClick={onClearFilters}
            >
              <img src={deleteFilter} alt="#"/>
              <span>Очистить фильтры</span>
            </div>
          }
        </div>
      </div>
      <div className="search-page__control">
        <div className="search-page__result-number">Результаты: 18</div>
        <div className="search-page__buttons-row">
          {!isSmallScreen && 
            <div className="search-page__download-result">
              <i className="base-icon-down-2 mr2"></i>
              Скачать результаты поиска
            </div>
          }
          <div className="search-page__sort-container">
            {!isSmallScreen &&
              <div className="search-page__sort-title">Сортировка:</div>
            }
            {(!isSmallScreen || filter === 'date') &&
              <div
                className={`search-page__sort-button ${filter === 'date' && 'active'}`}
                onClick={() => setFilter('date')}
              >
                <i className="base-icon-sort"></i>
                По дате
              </div>
            }
            {(!isSmallScreen || filter === 'number') &&
              <div 
                className={`search-page__sort-button ${filter === 'number' && 'active'}`}
                onClick={() => setFilter('number')}
              >
                <i className="base-icon-sort"></i>
                По номеру
              </div>
            }
          </div>
        </div>
      </div>
      <div className="search-page__items-container">
        {fakeItems.map((item) => (
          <ListElement 
            key={item.numberApplication}
            {...{ ...item, isSmallScreen}}
          />
        ))}
      </div>
    </PageWithSideMenu>
  );
};

const StyledTooltip = withStyles({
  tooltip: {
    width: '180px',
    background: '#FFFFFF',
    boxShadow: '0px 10px 22px rgba(44, 116, 255, 0.15)',
    borderRadius: '4px',
    padding: '10px 0',
    pointerEvents: 'auto'
  }
})(Tooltip);

const fakeItems = [
  {
    number: 'RU  2 738 60   0   C1',
    title: 'Патент на изобретение',
    message: 'прекращение правой охраны',
    numberApplication: '2019105338',
    date: '25.02.2019',
    datePublic: '25.08.2020',
    dateRegistration: '25.08.2020'
  },
  {
    number: 'RU  2 299 900   C2',
    title: 'Патент на изобретение',
    message: 'отклонена',
    numberApplication: '2019105339',
    date: '25.02.2019',
    datePublic: '25.08.2020',
    dateRegistration: '25.08.2020'
  },
  {
    number: 'RU  2 299 902    C1',
    title: 'Патент на изобретение',
    message: 'экспертиза по существу',
    numberApplication: '2019105340',
    date: '25.02.2019',
    datePublic: '25.08.2020',
    dateRegistration: '25.08.2020'
  },
  {
    number: 'RU  2 738 715    C2',
    title: 'Патент на изобретение',
    message: 'отклонена',
    numberApplication: '2019105341',
    date: '25.02.2019',
    datePublic: '25.08.2020',
    dateRegistration: '25.08.2020'
  },
  {
    number: 'RU  2 738 744    C1',
    title: 'Патент на изобретение',
    message: 'формальная экспертиза',
    numberApplication: '2019105342',
    date: '25.02.2019',
    datePublic: '25.08.2020',
    dateRegistration: '25.08.2020'
  },
  {
    number: 'RU  2 738 777    C1',
    title: 'Патент на изобретение',
    message: 'прекращение правой охраны',
    numberApplication: '2019105343',
    date: '25.02.2019',
    datePublic: '25.08.2020',
    dateRegistration: '25.08.2020'
  },
  {
    number: 'RU  2 738 772    C1',
    title: 'Патент на изобретение',
    message: 'экспертиза образца',
    numberApplication: '2019105344',
    date: '25.02.2019',
    datePublic: '25.08.2020',
    dateRegistration: '25.08.2020'
  }
];

const fakeModalItems = [
  {
    name: 'Запрос для поиска соответствуюших топологий интегральных микросхем',
    date: '12.09.2021',
    register: 'реестр полезных моделей'
  },
  {
    name: 'Запрос для поиска соответствуюших топологий интегральных микросхем',
    date: '13.09.2021',
    register: 'реестр полезных моделей'
  },
  {
    name: 'Запрос для поиска соответствуюших топологий интегральных микросхем',
    date: '14.09.2021',
    register: 'реестр полезных моделей'
  },
  {
    name: 'Запрос для поиска соответствуюших изобретений',
    date: '15.09.2021',
    register: 'реестр изобретений'
  },
  {
    name: 'Запрос для поиска соответствуюших топологий интегральных микросхем',
    date: '16.09.2021',
    register: 'реестр полезных моделей'
  },
  {
    name: 'Запрос для поиска соответствуюших топологий интегральных микросхем',
    date: '17.09.2021',
    register: 'реестр полезных моделей'
  },
  {
    name: 'Запрос для поиска соответствуюших изобретений',
    date: '18.09.2021',
    register: 'реестр изобретений'
  }
];