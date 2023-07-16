import React, { useCallback } from 'react';
import { SignatureField } from 'components';


export default React.memo ( Signature );

function Signature ({ id, label, value, placeholder, required, error, editField })
{
	const onChange = useCallback (
		e => editField ( e.target.files[ 0 ] ),
		[ editField ]
	);

	if ( value && !error ) return (
		<div className="input-row last">
			<div className="uploaded-input">
				<span>Файл ЭП прикреплен</span>
				<div className="label">
					{ value }
					<div
						className="delete base-icon-delete"
						onClick={ () => window.confirm ( 'Вы действительно хотите удалить файл ЭП?' ) && editField ( '' ) }
					/>
				</div>
			</div>
		</div>
	);

	return (
		<SignatureField {...{ id, label, placeholder, error, required, onChange }} />
	);
}
