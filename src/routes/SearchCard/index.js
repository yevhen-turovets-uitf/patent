import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Collapse from '@material-ui/core/Collapse';
import {
	PageWithSideMenu,
	Breadcrumbs
} from 'components';
import SideMenu from './SideMenu';
import ApplicationElement from './ApplicationElement';
import {
  openDataRoute,
  openRegistersRoute,
	openRegistersSearchRoute
} from 'urls';
import actions from 'actions';

export default React.memo(SearchCard);

const status = 'действует';
const lastUpdate = '20.02.2020';
const mpk = [
	'B03B 7/00 (2006.01)',
	'C22B 1/00 (2006.01)',
	'B01D 29/00 (2006.01)',
	'B01D 33/23 (2006.01)'
];
const spk = [
	'B03B 7/00 (2006.01)',
	'C22B 1/00 (2006.01)'
];
const description = 'Описание изобретения к патенту';

function SearchCard() {
	const { number } = useParams(),
	crumbs = [
		{ to: '/', title: 'Онлайн Роспатент' },
    { to: openDataRoute, title: 'Открытые данные' },
    { to: openRegistersRoute, title: 'Открытые реестры' },
		{ to: openRegistersSearchRoute, title: 'Поиск по реестру' },
    number
	],
	isDesktop = useMediaQuery({
    query: '(min-width: 1361px)'
  }),
	isSmallScreen = useMediaQuery({
    query: '(max-width: 768px)'
  }),
	dispatch = useDispatch(),
	[mainTab, setMainTab] = useState('bibliographic-data'),
	[secondaryTab, setSecondaryTab] = useState('abstract'),
	changeMainTab = useCallback (
		(event, newValue) => {
    	setMainTab(newValue);
  	},
		[]
	),
	changeSecondaryTab = useCallback (
		(event, newValue) => {
    	setSecondaryTab(newValue);
  	},
		[]
	),
  onGenerateReport = useCallback (
    () => dispatch ( actions.egrGenerateReportRequest ({
			sdIdentity: {
				regN: 819417,
				type: 'TradeMark',
				isApplication: false,
			},
			type: 'Extract'
		})),
    [ dispatch ]
  );

	return (
    <PageWithSideMenu
      className="search-card"
      menu={
				<div className="side-menu">
					{isDesktop && (
						<div className="search-card__aside-status">
							<div className="search-card__status-title">
								Статус:
								{' '}
								{status}
							</div>
							<div className="search-card__subtitle">
								Последнее изменение статуса
								{' '}
								{lastUpdate}
							</div>
						</div>
					)}
					<SideMenu { ...{ onGenerateReport } }/>
				</div>
			}
    >
			<Breadcrumbs crumbs={crumbs} />
			<div className="search-card__title-wrapper">
				<h4 className="section-title">Изобретения. Полезные модели</h4>
				<div className="search-card__control">
					<NavLink
						to="/"
						className="prew"
					>
						<i className="base-icon-arrow"></i>
						Предыдущий
					</NavLink>
					<NavLink
						to="/"
						className="next"
					>
						Следующий
						<i className="base-icon-arrow"></i>
					</NavLink>
				</div>
			</div>
			{!isDesktop && (
				<div className="search-card__status">
					<div className="search-card__status-title">
						Статус:
						{' '}
						{status}
					</div>
					<div className="search-card__subtitle">
						Последнее изменение статуса
						{' '}
						{lastUpdate}
					</div>
				</div>
			)}
			<div className="search-card__content">
				<div className="search-card__wrapper">
					<div className="search-card__card-id">
						<span className="search-card__number">(19)</span>
						<span className="search-card__id-value">RU</span>
						<span className="search-card__number">(19)</span>
						<span className="search-card__id-value">2019 105 338</span>
						<span className="search-card__number">(19)</span>
						<span className="search-card__id-value">C1</span>
					</div>
					<a
						href='/'
						className="search-card__download-pdf"
						download
					>
						<i className="base-icon-down-2"></i>
						Скачать PDF
					</a>
				</div>
				<div className="search-card__item">
					<div className="search-card__number">(19)</div>
					<div className="search-card__mpk">
						<div className="search-card__item-title">МПК</div>
						{mpk.map(
							elem => (
								<div key={elem} className="search-card__item-text">{ elem }</div>
							)
						)}
					</div>
				</div>
				<div className="search-card__item">
					<div className="search-card__number">(19)</div>
					<div className="search-card__spk">
						<div className="search-card__item-title">МПК</div>
						{spk.map(
							elem => (
								<div key={elem} className="search-card__item-text">{ elem }</div>
							)
						)}
					</div>
				</div>
				<div className="search-card__item">
					<div className="search-card__number">(19)</div>
					<div className="search-card__item-text">{ description }</div>
				</div>
				<div className="search-card__tabs-container">
					<Tabs
						value={mainTab}
						onChange={changeMainTab}
						variant="scrollable"
						scrollButtons="off"
						className="search-card__tabs"
					>
						<Tab
							label="Библиографические данные"
							value="bibliographic-data"
							className="search-card__tabs-item"
						/>
						<Tab
							label="Актуальное состояние"
							value="actual-state"
							className="search-card__tabs-item"
						/>
					</Tabs>
					<div className="tabs__body">
						<Collapse
							in={mainTab === "bibliographic-data"}
							timeout={ 400 }
						>
							<div className="search-card__tabs-content-item">
								<p>(24) Дата начала отсчета срока действия патента: 09.07.2019<br /> Дата регистрации: 11.12.2019</p>
								<p>(72) Автор(ы): Красный Борис Лазаревич (RU), Красный Максим Борисович (RU), Иконников Константин Игоревич (RU)</p>
								<p>(73) Патентообладатель(и): Общество с ограниченной ответственностью "Научно-технический центр "Бакор" (RU)</p>
							</div>
						</Collapse>
						<Collapse
							in={mainTab === "actual-state"}
							timeout={ 400 }
						>
							<div className="search-card__tabs-content-item">
								<p>(24) Дата начала отсчета срока действия патента: 09.07.2019<br /> Дата регистрации: 11.12.2019</p>
								<p>(72) Автор(ы): Красный Борис Лазаревич (RU), Красный Максим Борисович (RU), Иконников Константин Игоревич (RU)</p>
								<p>(73) Патентообладатель(и): Общество с ограниченной ответственностью "Научно-технический центр "Бакор" (RU)</p>
							</div>
							<div className="search-card__tabs-content-item">
								<p>(24) Дата начала отсчета срока действия патента: 09.07.2019<br /> Дата регистрации: 11.12.2019</p>
								<p>(72) Автор(ы): Красный Борис Лазаревич (RU), Красный Максим Борисович (RU), Иконников Константин Игоревич (RU)</p>
								<p>(73) Патентообладатель(и): Общество с ограниченной ответственностью "Научно-технический центр "Бакор" (RU)</p>
							</div>
						</Collapse>
					</div>
				</div>
				<div className="search-card__tabs-container">
					<Tabs
						value={secondaryTab}
						onChange={changeSecondaryTab}
						variant="scrollable"
						scrollButtons="off"
						className="search-card__tabs"
					>
						<Tab
							label="Реферат"
							value="abstract"
							className="search-card__tabs-item"
						/>
						<Tab
							label="Формула изобретения"
							value="claim"
							className="search-card__tabs-item"
						/>
						<Tab
							label="Описание изобретения"
							value="invention-description"
							className="search-card__tabs-item"
						/>
						<Tab
							label="Чертежи"
							value="blueprint"
							className="search-card__tabs-item"
						/>
						<Tab
							label="Извещения"
							value="notice"
							className="search-card__tabs-item"
						/>
					</Tabs>
					<div className="tabs__body">
						<Collapse
							in={secondaryTab === "abstract"}
							timeout={ 400 }
						>
							<div className="search-card__tabs-content-item">
								<p>(24) Дата начала отсчета срока действия патента: 09.07.2019<br /> Дата регистрации: 11.12.2019</p>
								<p>(72) Автор(ы): Красный Борис Лазаревич (RU), Красный Максим Борисович (RU), Иконников Константин Игоревич (RU)</p>
								<p>(73) Патентообладатель(и): Общество с ограниченной ответственностью "Научно-технический центр "Бакор" (RU)</p>
							</div>
						</Collapse>
						<Collapse
							in={secondaryTab === "claim"}
							timeout={ 400 }
						>
							<div className="search-card__tabs-content-item">
								<p>(24) Дата начала отсчета срока действия патента: 09.07.2019<br /> Дата регистрации: 11.12.2019</p>
								<p>(72) Автор(ы): Красный Борис Лазаревич (RU), Красный Максим Борисович (RU), Иконников Константин Игоревич (RU)</p>
								<p>(73) Патентообладатель(и): Общество с ограниченной ответственностью "Научно-технический центр "Бакор" (RU)</p>
							</div>
							<div className="search-card__tabs-content-item">
								<p>(24) Дата начала отсчета срока действия патента: 09.07.2019<br /> Дата регистрации: 11.12.2019</p>
								<p>(72) Автор(ы): Красный Борис Лазаревич (RU), Красный Максим Борисович (RU), Иконников Константин Игоревич (RU)</p>
								<p>(73) Патентообладатель(и): Общество с ограниченной ответственностью "Научно-технический центр "Бакор" (RU)</p>
							</div>
						</Collapse>
						<Collapse
							in={secondaryTab === "invention-description"}
							timeout={ 400 }
						>
							<div className="search-card__tabs-content-item">
								<p>(24) Дата начала отсчета срока действия патента: 09.07.2019<br /> Дата регистрации: 11.12.2019</p>
							</div>
						</Collapse>
						<Collapse
							in={secondaryTab === "blueprint"}
							timeout={ 400 }
						>
							<div className="search-card__tabs-content-item">
								<p>(24) Дата начала отсчета срока действия патента: 09.07.2019<br /> Дата регистрации: 11.12.2019</p>
								<p>(72) Автор(ы): Красный Борис Лазаревич (RU), Красный Максим Борисович (RU), Иконников Константин Игоревич (RU)</p>
								<p>(73) Патентообладатель(и): Общество с ограниченной ответственностью "Научно-технический центр "Бакор" (RU)</p>
							</div>
							<div className="search-card__tabs-content-item">
								<p>(24) Дата начала отсчета срока действия патента: 09.07.2019<br /> Дата регистрации: 11.12.2019</p>
								<p>(72) Автор(ы): Красный Борис Лазаревич (RU), Красный Максим Борисович (RU), Иконников Константин Игоревич (RU)</p>
								<p>(73) Патентообладатель(и): Общество с ограниченной ответственностью "Научно-технический центр "Бакор" (RU)</p>
							</div>
							<div className="search-card__tabs-content-item">
								<p>(24) Дата начала отсчета срока действия патента: 09.07.2019<br /> Дата регистрации: 11.12.2019</p>
								<p>(72) Автор(ы): Красный Борис Лазаревич (RU), Красный Максим Борисович (RU), Иконников Константин Игоревич (RU)</p>
								<p>(73) Патентообладатель(и): Общество с ограниченной ответственностью "Научно-технический центр "Бакор" (RU)</p>
							</div>
						</Collapse>
						<Collapse
							in={secondaryTab === "notice"}
							timeout={ 400 }
						>
							<div className="search-card__tabs-content-item">
								<p>(72) Автор(ы): Красный Борис Лазаревич (RU), Красный Максим Борисович (RU), Иконников Константин Игоревич (RU)</p>
								<p>(73) Патентообладатель(и): Общество с ограниченной ответственностью "Научно-технический центр "Бакор" (RU)</p>
							</div>
						</Collapse>
					</div>
				</div>
				<ApplicationElement
					{...{ isSmallScreen }}
				/>
			</div>
		</PageWithSideMenu>
	);
};
