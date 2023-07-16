import React from 'react';
import { FieldWrapper } from 'components';


export default React.memo ( SignatureField );

function SignatureField ({ id, error, label, placeholder = 'Прикрепите файл ЭП к приложению', required, onChange })
{
	return (
		<FieldWrapper {...{ id, label, required, error }}>
			<div className="upload-input">
				<label>
					<input type="file" {...{ onChange }} />
					<div className="input">
						<input className="input" {...{ placeholder }} />
					</div><span>Выбрать файл ЭП</span>
				</label>
			</div>
		</FieldWrapper>
	);
}
