/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useCallback, useEffect } from 'react';
import { Modal, SelectInput, PrimaryButton, Waiter } from 'components';
import { useCreateDraftStatement } from 'hooks';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import api from 'api';
const defaultArr = [];

export default {
	Modal: React.memo ( ReferredModal ),
	Button: React.memo ( Button )
};

function ReferredModal ({ id, isOpen, open, close })
{
	const classes = useStyles(),
		options = useReferredStatementTypes ( id, isOpen ),
		[ value, setValue ] = useState ( null ),
		onChange = useCallback ( e => setValue ( e.target.value ), [] ),
		[ createDraftStatement, waiter ] = useCreateDraftStatement();

	return (
		<Modal className={ classes.modal } open={ isOpen } onClick={ close }>
			<h6 className={ classes.title }>Выберите тип связанного документа</h6>
			<SelectInput placeholder="Выберите тип связанного документа" {...{ options, value, onChange }} />
			<div className={ classes.buttons }>
				<PrimaryButton
					className={ clsx ( classes.button, classes.firstButton ) }
					title="Создать документ"
					onClick={ () => createDraftStatement ( value, id ) }
					disabled={ value === null }
				/>
				<PrimaryButton
					className={ classes.button }
					lightGray
					title="Отмена"
					onClick={ close }
				/>
			</div>
			{ waiter &&
				<Waiter />
			}
		</Modal>
	);
}

function Button ( props )
{
	return (
		<a className="button-style1 without-bg" { ...props }>
			<i className="base-icon-file-add" />
			<span>Создать документ</span>
		</a>
	);
}


const useStyles = makeStyles ( theme => ({
	...theme.styles.Modal,
	modal: {
		...theme.styles.Modal.modal,
		position: 'relative'
	},
	title: {
		...theme.styles.Modal.title,
		marginBottom: 15
	},
	button: theme.styles.fullWidth
}) );

function useReferredStatementTypes ( id, isOpen )
{
	const [ options, setOptions ] = useState ( defaultArr );

	useEffect (
		() => {
			if ( id !== undefined && !options.length )
			{
				const status = { cancelled: false };

				api.web.getReferredStatementTypes ( id )
					.then ( ({ result: { referred_statement_types = [] } = {}, error }) => {
						if ( status.cancelled ) return;

						if ( error ) throw error.message || 'Произошла ошибка при загрузке типов связанных документов';

						setOptions (
							referred_statement_types.length ?
								referred_statement_types.map (
									({ id, title }) => ({ value: id, label: title })
								)
								:
								defaultArr
						);
					} )
					.catch ( alert );
			}
		},
		[ id, options, isOpen ]
	);

	return options;
}
