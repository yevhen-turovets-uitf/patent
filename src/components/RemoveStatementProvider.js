import React, { useState, useCallback } from 'react';
import { AlertModal } from 'components';
import { useDispatch } from 'react-redux';
import actions from 'actions';
import { RemoveStatement } from 'context';


export default React.memo ( RemoveStatementProvider );

function RemoveStatementProvider ({ children })
{
	const [ open, alertProps, openRemoveStatementAlert, onConfirm, onCancel ] = useRemoveStatementAlert();

	return (
		<RemoveStatement.Provider value={ openRemoveStatementAlert }>
			{ children }
			<AlertModal
				confirmButtonTitle="Удалить"
				{ ...alertProps }
				{...{ open, onConfirm, onCancel }}
			/>
		</RemoveStatement.Provider>
	);
}


function useRemoveStatementAlert ()
{
	const dispatch = useDispatch(),
		[ open, setOpen ] = useState ( false ),
		[ args, setArgs ] = useState ( [] ),
		[ alertProps, setAlertProps ] = useState ( {} ),
		openRemoveStatementAlert = useCallback (
			( id, callback, alertProps ) => {
				setOpen ( true );
				setArgs ([ id, callback ]);
				setAlertProps ({
					title: `Вы действительно хотите удалить заявку ${ id }?`,
					text: 'Приложения и связанные документы будут удалены вместе с заявкой.',
					...alertProps
				});
			},
			[]
		),
		onConfirm = useCallback (
			() => {
				dispatch (
					actions.removeStatementRequest ( ...args )
				);

				setOpen ( false );
			},
			[ args, dispatch ]
		),
		onCancel = useCallback (
			() => setOpen ( false ),
			[]
		);

	return [ open, alertProps, openRemoveStatementAlert, onConfirm, onCancel ];
}
