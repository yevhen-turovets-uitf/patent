import React, { useCallback } from 'react';
import { PrimaryButton } from 'components';
import { useDispatch } from 'react-redux';
import actions from 'actions';


export default React.memo ( SubmissionBlock );

function SubmissionBlock ({ id, isReferred })
{
	const dispatch = useDispatch(),
			onClick = useCallback (
			() => dispatch (
				actions.acceptStatementRequest ( id )
			),
			[ id, dispatch ]
		);

	return (
		<React.Fragment>
			<PrimaryButton
				title={ `Отправить ${ isReferred ? 'документ' : 'заявление' }` }
				{...{ onClick }}
			/>
			<p className="border-top-box">Нажимая на кнопку «Отправить { isReferred ? 'документ' : 'заявление' }» Заявитель подтверждает наличие согласия других субъектов персональных данных, указанных в заявлении (за исключением согласия представителя), на обработку их персональных данных, приведенных в настоящем заявлении, в Роспатенте в связи с предоставлением государственной услуги. Согласия оформлены в соответствии со статьей 9 Федерального закона от 27 июля 2006 г. № 152-ФЗ «О персональных данных»</p>
		</React.Fragment>
	);
}
