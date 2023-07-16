import React, { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Modal, PrimaryButton, Waiter } from 'components';
import actions from 'actions';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const titles = {
		validationError: 'Обязательные поля остались незаполненными.\nХотите сохранить черновик?',
		validationSuccess: 'Вы сохранили черновик',
		submissionError: 'Обязательные поля остались незаполненными',
		submissionSuccess: 'Заявление успешно отправлено',
		submissionSuccessReferred: 'Успешно отправлено',
		externalServiceError: 'Результат проверки заявления'
	},
	button1 = {
		validationError: 'Сохранить и перейти в ЛК',
		validationErrorReferred: 'Сохранить и перейти к Заявлению',
		validationSuccess: 'Перейти в Личный кабинет',
		validationSuccessReferred: 'Перейти к Заявлению',
		submissionError: 'Продолжить заполнение',
		submissionSuccess: 'Перейти в Личный кабинет',
		submissionSuccessReferred: 'Перейти к Заявлению',
		externalServiceError: 'Отправить заявление'
	},
	button2 = {
		validationError: 'Сохранить и остаться в Заявке',
		validationErrorReferred: 'Сохранить и остаться в Документе',
		validationSuccess: 'Продолжить редактирование',
		submissionError: 'Сохранить и перейти в ЛК',
		submissionErrorReferred: 'Сохранить и перейти к Заявлению',
		externalServiceError: 'Продолжить редактирование'
	},
	onClick1 = {
		validationError: 'lk',
		validationErrorReferred: 'statement',
		validationSuccess: 'lk',
		validationSuccessReferred: 'statement',
		submissionError: 'close',
		submissionSuccess: 'lk',
		submissionSuccessReferred: 'statement',
		externalServiceError: 'status'
	},
	onClick2 = {
		validationError: 'close',
		validationSuccess: 'close',
		submissionError: 'lk',
		submissionErrorReferred: 'statement',
		externalServiceError: 'close'
	},
	defaultArr = [];


export default React.memo ( StatementModal );

function StatementModal ()
{
	const classes = useStyles(),
		{ isReferred, parent_id, modal, id, waiter } = useSelector ( ({ statement }) => statement ),
		{ scrollTo = false } = modal || {},
		dispatch = useDispatch(),
		history = useHistory(),
		close = useCallback (
			() => dispatch ( actions.statementScrollToField ( scrollTo ) ),
			[ scrollTo, dispatch ]
		),
		lk = useCallback (
			() => history.push ( '/panel' ),
			[ history ]
		),
		statement = useCallback (
			() => history.push ( `/panel/statement/${ parent_id }` ),
			[ parent_id, history ]
		),
		status = useCallback (
			() => dispatch (
				actions.changeStatementStatusRequest ( id )
			),
			[ id, dispatch ]
		),
		clickHandlers = useMemo (
			() => ({ close, lk, statement, status }),
			[ lk, close, statement, status ]
		),
		{ modalType = '', invalidSections = defaultArr, errors } = modal || {};

	return (
		<Modal className={ classes.modal } open={ !!modalType }>
			<h6 className={ classes.title }>{ getValue ( titles, modalType, isReferred ) }</h6>
			{ ( modalType === 'validationError' || modalType === 'submissionError' ) &&
				<React.Fragment>
					<p className={ classes.subtitle }>Заполните поля в следующих разделах:</p>
					<div className={ classes.invalidItems }>
						{ invalidSections.map (
							({ id, short_title, title }) => (
								<p key={ id } className={ classes.invalidItem }>{ short_title || title }</p>
							)
						) }
					</div>
				</React.Fragment>
			}
			{ !!errors &&
				<React.Fragment>
					<div className={ classes.invalidItems }>
						{ errors.map ( ({ id, title, text }) =>
							<div key={ id } className={ classes.error }>
								<p className={ classes.errorTitle }>{ title }</p>
								<p className={ classes.errorText }>{ text }</p>
							</div>
						) }
					</div>
				</React.Fragment>
			}
			<div className={ classes.buttons }>
				<PrimaryButton
					className={ clsx ( classes.button, classes.firstButton ) }
					title={ getValue ( button1, modalType, isReferred ) }
					onClick={ clickHandlers[ getValue ( onClick1, modalType, isReferred ) ] }
				/>
				{ !!button2[ modalType ] &&
					<PrimaryButton
						className={ classes.button }
						lightGray
						title={ getValue ( button2, modalType, isReferred ) }
						onClick={ clickHandlers[ getValue ( onClick2, modalType, isReferred ) ] }
					/>
				}
			</div>
			{ !!waiter &&
				<Waiter />
			}
		</Modal>
	);
}


const useStyles = makeStyles ( theme => ({
	...theme.styles.Modal,
	invalidItems: {
		margin: '0 0 30px',
		fontWeight: 500,
		fontSize: 14,
		color: '#D52B1E'
	},
	invalidItem: {
		margin: '11px 0'
	},
	errors: {
		margin: '0 0 30px'
	},
	error: {
		margin: [[ 16, 0 ]]
	},
	errorTitle: {
		fontWeight: 400,
		color: '#151515',
		margin: [[ 4, 0 ]]
	},
	errorText: {
		margin: 0
	},
	button: theme.styles.fullWidth
}) );

function getValue ( source, modal, isReferred )
{
	return ( isReferred && source[ modal + 'Referred' ] ) || source[ modal ];
}
