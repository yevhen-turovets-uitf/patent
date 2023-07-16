/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import {
	Breadcrumbs,
	Print,
	Notifications,
	EventsMenu,
	Waiter,
	Downloadify,
	StatementInfoModal
} from 'components';
import UploadImage from './UploadImage';
import Attachment from './Attachment';
import { makeStyles } from '@material-ui/core/styles';
import { useRequest, useReferredModal } from 'hooks';
import { useDispatch, useSelector } from 'react-redux';
import { getStatusName } from 'functions';
import { RemoveStatement } from 'context';
import actions from 'actions';
import moment from 'moment';
import clsx from 'clsx';
import { statementRoute } from 'urls';

const crumbs = [
		{ to: '/panel', title: 'Личный кабинет' },
		'Мои объекты'
	],
	defaultObj = {};


export default React.memo ( FilledStatement );

function FilledStatement ()
{
	const classes = useStyles(),
		{ id } = useParams(),
		history = useHistory(),
		[ isOpen, setOpen ] = useState(false),
		[ disabled, setDisabled ] = useState(false),
		[ { result: { reg_number, statement_title, service_title, date_time, status, attachments = [], referred = [], display = {} } = {} }, , , refresh ] = useRequest ( 'getFilledStatement', id ),
		attachmentRows = attachments.filter ( ({ name }) => name ),
		displayTitles = Object.keys ( display ),
		edit = useCallback (
			() => history.push ( `${ statementRoute }/${ id }/edit` ),
			[ id, history ]
		),
		[ ReferredModal, ReferredModalButton, openReferredModal ] = useReferredModal ( id ),
		[ copyWaiter, copyStatement ] = useCopyStatement ( id ),
		onClickLink = useCallback (
			() => setOpen(true),
			[]
		),
		onConfirmCreation = useCallback (
			() => {
				setDisabled(true);
				copyStatement();
			},
			[copyStatement]
		);

	return (
		<main>
			<ReferredModal />
			<div className="container">
				<Breadcrumbs {...{ crumbs }} />
				<div className={ clsx ( 'lc-container row', classes.relative ) }>
					<div className="lc-content col">
						<div className="heading-block page-title page-request-title with-link with-events">
							<h1 className="h">{ reg_number !== null ? reg_number : id }</h1>
							<div className="buttons">
								{ status === 'DRAFT' &&
									<a
										className="button-style1 without-bg"
										onClick={ edit }
									>
										<i className="base-icon-edit" />
										<span>Редактировать</span>
									</a>
								}
								<a
									className="button-style1 without-bg"
									onClick={ onClickLink }
								>
									<i className="base-icon-copy" />
									<span>Копировать</span>
								</a>
								<Print
									className="without-bg"
									title="Скачать PDF"
									icon="down-2"
									statementId={ id }
									statementName={ statement_title }
								/>
								<ReferredModalButton />
							</div>
							<EventsMenu className="events-menu">
								{ status === 'DRAFT' &&
									<a onClick={ edit }>Редактировать</a>
								}
								<a onClick={ onClickLink }>Копировать</a>
								{ !!statement_title &&
									<Downloadify name={ statement_title } {...{ id }}>
										<a>Распечатать</a>
									</Downloadify>
								}
								<a onClick={ openReferredModal }>Создать документ</a>
							</EventsMenu>
						</div>
						<div className="post-details">
							<div className="pd-top">
								<div className="date">от { moment ( date_time ).format ( 'DD.MM.YYYY' ) }</div>
								<div className="status">{ getStatusName ( status ) }</div>
							</div>
							<h5 className="pd-title">{ statement_title }</h5>
							<div className="pd-gu-title">{ service_title }</div>
							{ !!displayTitles.length &&
								<div className="pd-info">
									{ displayTitles.map ( title => (
										<div key={ title } className="item" style={{ margin: '20px 0' }}>
											{ display[ title ].map ( ( row, i ) =>
												<p key={ i } style={{ margin: '5px 0' }}>{ row.join ( ' ' ) }</p>
											) }
										</div>
									) ) }
								</div>
							}
							{ !!attachmentRows.length &&
								<React.Fragment>
									<div className="heading-block accent">
										<h4 className="h">Приложения</h4>
									</div>
									{ attachmentRows.map (
										({ id, name }) => <Attachment key={ id } {...{ id, name }} />
									) }
								</React.Fragment>
							}
							<div className="space-block" style={{ height: 5, marginTop: -10 }}></div>
							<div className="heading-block accent">
								<h4 className="h">Делопроизводство</h4>
							</div>
							{ referred && referred.length ?
								referred.map ( ({ id, statement_title, date_time, status, attachments, display = defaultObj }) => (
									<div key={ id } className="request-documents-box gray-box">
										<div className="top">
											<div className="title h5">{ statement_title }</div>
											<div className="date">
												<i className={ `base-icon-${ status === 'PROCESSING' ? 'up' : 'text' }` }/>
												{ moment ( date_time ).format ( 'DD.MM.YYYY' ) }
												<EventsMenu className="events-menu">
													{ status === 'DRAFT' &&
														<a onClick={ () => history.push ( `/panel/statement/${ id }/edit` ) }>Редактировать</a>
													}
													<Downloadify name={ statement_title } {...{ id }}>
														<a>Распечатать</a>
													</Downloadify>
													{ status === 'DRAFT' &&
														<RemoveStatement.Consumer>
															{ openRemoveStatementAlert => (
																<a
																	className={ classes.remove }
																	onClick={
																		() => openRemoveStatementAlert (
																			id,
																			refresh,
																			{
																				title: `Вы действительно хотите удалить документ ${ statement_title }?`,
																				text: 'Приложения будут удалены вместе с документом'
																			}
																		)
																	}
																>
																	Удалить
																</a>
															) }
														</RemoveStatement.Consumer>
													}
												</EventsMenu>
											</div>
										</div>
										<div className="content-row">
											<div className="content">
												<div className="document-links in-row">
													{ attachments.map (
														({ id, name }) => <Attachment key={ id } isReferred {...{ id, name }} />
													) }
												</div>
												{ Object.keys ( display ).map (
													key => ( display[ key ] || [] ).map (
														( row, i ) => <p key={ i }>{ row.join ( ' ' ) }</p>
													)
												) }
											</div>
										</div>
									</div>
								) )
								:
								<div key={ id } className="request-documents-box">
									<div className="top active" style={{ cursor: 'default' }}>
										<div className="title h5">В данной области экрана будет отображаться информация о ходе переписки, имеющей отношение к выбранному заявлению/заявке. В настоящий момент информация для отображения отсутствует</div>
									</div>
								</div>
							}
						</div>
					</div>
					<div className="lc-sidebar col">
						<UploadImage {...{ id }} />
						<Notifications mini />
					</div>
					{ copyWaiter &&
						<Waiter />
					}
					<StatementInfoModal
						onConfirm={onConfirmCreation}
						onCancel={() => setOpen(false)}
						open={isOpen}
						disabled={disabled}
					/>
				</div>
			</div>
		</main>
	);
}


const useStyles = makeStyles ( theme => ({
	relative: {
		position: 'relative'
	},
	remove: {
		color: [ theme.palette.common.red, '!important' ]
	}
}) );

function useCopyStatement ( id )
{
	const dispatch = useDispatch(),
		waiter = useSelector ( st => st.statements.waiter ),
		copyStatement = useCallback (
			() => dispatch (
				actions.copyStatementRequest ( id )
			),
			[ id, dispatch ]
		);

	return [ waiter, copyStatement ];
}
