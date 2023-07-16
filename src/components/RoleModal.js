import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { Modal, SelectInput, PrimaryButton, Waiter } from 'components';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import actions from 'actions';
import clsx from 'clsx';
import api from 'api';
const defaultArr = [];


export default React.memo ( RoleModal );

function RoleModal ()
{
	const classes = useStyles(),
		dispatch = useDispatch(),
		user = useSelector ( ({ user }) => user ),
		roles = Array.isArray ( user.roles ) ? user.roles : defaultArr,
		isOpen = roles.length > 1,
		options = useMemo (
			() => roles.map (
				role => ({ value: role.oid, label: role.shortName })
			),
			[ roles ]
		),
		[ value, setValue ] = useState ( ( options[ 0 ] || {} ).value || null ),
		onChange = useCallback ( e => setValue ( e.target.value ), [] ),
		[ waiter, selectUserRole ] = useSelectUserRole ( value ),
		logout = useCallback (
			() => dispatch ( actions.logout() ),
			[ dispatch ]
		);

	useEffect (
		() => {
			setValue ( ( options[ 0 ] || {} ).value || null );
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ roles ]
	);

	return (
		<Modal className={ classes.modal } open={ isOpen }>
			<h6 className={ classes.title }>Выберите вариант авторизации</h6>
			<SelectInput placeholder="Выберите вариант авторизации" {...{ options, value, onChange }} />
			<div className={ classes.buttons }>
				<PrimaryButton
					className={ clsx ( classes.button, classes.firstButton ) }
					title="Войти в личный кабинет"
					onClick={ selectUserRole }
					disabled={ value === null }
				/>
				<PrimaryButton
					className={ classes.button }
					lightGray
					title="Продолжить без авторизации"
					onClick={ logout }
				/>
			</div>
			{ waiter &&
				<Waiter />
			}
		</Modal>
	);
}


const useStyles = makeStyles ( theme => ({
	...theme.styles.Modal,
	modal: {
		...theme.styles.Modal.modal,
		width: '100%',
		maxWidth: 454,
		position: 'relative',
	},
	title: {
		...theme.styles.Modal.title,
		marginBottom: 15
	},
	button: theme.styles.fullWidth
}) );

function useSelectUserRole ( oid )
{
	const [ waiter, setWaiter ] = useState ( false ),
		dispatch = useDispatch(),
		history = useHistory(),
		request = useCallback (
			oid => {
				setWaiter ( true );

				api.web.selectUserRole ( oid )
					.then ( ({ error, result }) => {
						if ( error ) throw error;

						dispatch ( actions.setUser ( result ) );

						setWaiter ( false );

						history.push ( '/' );
					} )
					.catch ( err => {
						dispatch ( actions.error ( err, true ) );

						setWaiter ( false );
					} );
			},
			[ history, dispatch ]
		),
		selectUserRole = useCallback (
			() => request ( oid ),
			[ oid, request ]
		);

	return [ waiter, selectUserRole ];
}
