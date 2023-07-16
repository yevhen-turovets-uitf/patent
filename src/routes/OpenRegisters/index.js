import React, { useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import actions from 'actions';
import {
	openDataRoute,
	openRegistersSearchRoute,
	disputedObjectionsRegisterRoute,
	statementsRegisterRoute
} from 'urls';
import {
	PageWithSideMenu,
	Breadcrumbs,
	OpenDataSideMenu
} from 'components';
import { openRegistersTableData } from 'staticData';

export default React.memo(OpenRegisters);

function OpenRegisters() {
	const isSmallScreen = useMediaQuery({
			query: '(max-width: 768px)'
		}),
		dispatch = useDispatch(),
		history = useHistory(),
		crumbs = [
			{ to: '/', title: 'Онлайн Роспатент' },
			{ to: openDataRoute, title: 'Открытые данные' },
			'Открытые реестры'
		],
		onClickLink = useCallback (
			searchConfig => {
				dispatch ( actions.searchMainForm (searchConfig));
				history.push (openRegistersSearchRoute);
			},
			[dispatch, history]
		);

	return (
    <PageWithSideMenu
      className="open-registers"
      menu={<OpenDataSideMenu closedType="open-registers"/>}
    >
			<Breadcrumbs crumbs={crumbs} />
			<h4 className="section-title">Открытые реестры</h4>
			<div className="open-registers__content">
				{!isSmallScreen && (
					<>
						<div className="open-registers__grid-head"></div>
						<div className="open-registers__grid-head">По зарегистрированным объектам</div>
						<div className="open-registers__grid-head">По заявкам</div>
					</>
				)}
				{openRegistersTableData.map(
					({ title, objectLinks, statementLinks }) => (
						<React.Fragment key={ title }>
							<div className="open-registers__grid-title">
								{ title }
							</div>
							<div className="open-registers__grid-object">
								{isSmallScreen && objectLinks.length > 0 && (
									<div className="open-registers__sub-head">По зарегистрированным объектам</div>
								)}
								{objectLinks.map(
									({ text, searchConfig }) => (
										<div key={text} className="open-registers__link-wrapper">
											<span
												className="open-registers__link"
												onClick={() => onClickLink(searchConfig)}
											>
												{ text }
											</span>
										</div>
									)
								)}
							</div>
							<div className="open-registers__grid-statement">
								{isSmallScreen && statementLinks.length > 0 && (
									<div className="open-registers__sub-head">По заявкам</div>
								)}
								{statementLinks.map(
									({ text, searchConfig }) => (
										<div key={text} className="open-registers__link-wrapper">
											<span
												className="open-registers__link"
												onClick={() => onClickLink(searchConfig)}
											>
												{ text }
											</span>
										</div>
									)
								)}
							</div>
						</React.Fragment>
					)
				)}
			</div>
			<div className="open-registers__link-row">
				<NavLink
					className="open-registers__link"
					to={statementsRegisterRoute}
				>
					Реестр заявлений о гос.регистрации распоряжения исключительным правом по договору и заявлений о гос.регистрации перехода права без договора
				</NavLink>
			</div>
			<div className="open-registers__link-row">
				<NavLink
					className="open-registers__link"
					to={disputedObjectionsRegisterRoute}
				>
					Реестр возражений и заявлений, связанных с оспариванием и признанием недействительным предоставления правовой охраны ОИС, подаваемым в Роспатент
				</NavLink>
			</div>
		</PageWithSideMenu>
	);
}
