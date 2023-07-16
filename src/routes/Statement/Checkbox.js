import React, { useCallback } from 'react';
import { FieldWrapper } from 'components';
import Block from './Block';
import FilledSectionRow from './FilledSectionRow';
import { useDispatch, useSelector } from 'react-redux'; 
import actions from 'actions';


export default React.memo ( Checkbox );

function Checkbox ({ id, normalizedId, title, value, readOnly, sectionId })
{
	const dispatch = useDispatch(),
		error = useSelector ( st => st.statement.normalized[ normalizedId ].error ),
		statementId = useSelector ( st => st.statement.id ),
		checked = value !== 'False' && !!value,
		onChange = useCallback (
			e => {
				const value = e.target.value === 'true';

				dispatch (
					actions.editFieldRequest ( statementId, id, value, normalizedId )
				);
			},
			[ statementId, id, normalizedId, dispatch ]
		);

	return (
		<React.Fragment>
			{ readOnly ?
				<FilledSectionRow {...{ title, value }} />
				:
				<FieldWrapper noLabel {...{ id, error }}>
					<label>
						<input
							type="checkbox"
							value={ !checked }
							{...{ checked, onChange }}
						/>
						{ title }
					</label>
				</FieldWrapper>
			}
			{ checked &&
				<Block
					forcedType="CONTAINER"
					{...{ normalizedId, readOnly, sectionId }}
				/>
			}
		</React.Fragment>
	);
}
