import React, { useMemo, useCallback, useEffect } from 'react';
import { SelectField, TextField, PrimaryButton, Waiter } from 'components';
import { Formik, Form } from 'formik';
import { useRequest } from 'hooks';
import { withFormikFieldWrapper } from 'hocs';
import api from 'api';

const isRequired = 'Поле обязательно к заполнению',
	validate = values => [ 'subject', 'message' ].reduce (
		( res, name ) => values[ name ] ? res : { ...res, [ name ]: isRequired },
		{}
	),
	WrappedSelectField = withFormikFieldWrapper ( SelectField ),
	WrappedTextField = withFormikFieldWrapper ( TextField );


export default React.memo ( AppealForm );

function AppealForm ({ isOpen, close, setAppeals }) {
	const [ { result: options = [] },, optionsError ] = useRequest ( 'getAppealSubjects' ),
		initialValues = useMemo (
			() => ({ subject: ( options[ 0 ] || {} ).value || '', message: '' }),
			[ options ]
		),
		onSubmit = useCallback (
			( { subject, message }, { setSubmitting, setErrors } ) => {
				return api.web.createAppeal ( subject, message )
					.then ( res => {
						if ( res.error ) throw res.error;

						setAppeals (
							appeals => [ res.result, ...appeals ]
						);

						close();
					} )
					.catch ( err => {
						if ( typeof err === 'object' )
						{
							if ( err.messages ) setErrors ( err.messages );
							if ( err.message ) alert ( err.message );
						}
						else alert ( err );
					} );
			},
			[ setAppeals, close ]
		);

	return (
		<Formik {...{ initialValues, validate, onSubmit }}>
			{ ({ errors, isSubmitting, isValidating, handleSubmit, resetForm, ...rest }) => (
				<Form>
					<ResetForm {...{ isOpen, resetForm }} />
					<WrappedSelectField
						name="subject"
						label="Тема обращения"
						placeholder="Выберите из списка"
						{...{ options }}
						error={ errors.subject || optionsError }
					/>
					<WrappedTextField
						name="message"
						label="Текст обращения"
						rows="5"
						textarea
					/>
					<div className="buttons">
						<PrimaryButton className="without-bg" title="Отмена" onClick={ close } />
						<PrimaryButton type="submit" title="Отправить" onClick={ handleSubmit } />
					</div>
					{ isSubmitting && <Waiter /> }
				</Form>
			) }
		</Formik>
	);
}


function ResetForm ({ isOpen, resetForm }) {
	useEffect (
		() => {
			if ( isOpen ) resetForm();
		},
		[ isOpen, resetForm ]
	);

	return null;
}
