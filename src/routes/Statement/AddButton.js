import React, { useCallback } from 'react';
import { PrimaryButton } from 'components';
import { useDispatch } from 'react-redux';
import actions from 'actions';


export default React.memo ( AddButton );

function AddButton ({ icon, title, statementId, sectionId })
{
	const dispatch = useDispatch(),
			onClick = useCallback (
			() => dispatch (
				actions.addStatementSectionRequest ( statementId, sectionId )
			),
			[ statementId, sectionId, dispatch ]
		);

	return <PrimaryButton add lightGray {...{ icon, title, onClick }} />;
}
