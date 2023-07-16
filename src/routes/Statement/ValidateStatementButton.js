import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import actions from 'actions';


export default React.memo ( ValidateStatementButton );

function ValidateStatementButton ({ id })
{
	const dispatch = useDispatch(),
			onClick = useCallback (
			() => dispatch (
				actions.validateStatementRequest ( id )
			),
			[ id, dispatch ]
		);

	return (
		<button className="button-style1 outline" {...{ onClick }}>
			<span>Сохранить черновик заявления</span>
		</button>
	);
}
