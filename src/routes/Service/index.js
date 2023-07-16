/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { useRequest, useCreateDraftStatement } from 'hooks';
import { ReturnButton, StatementWrapper, Waiter, StatementInfoModal } from 'components';
import actions from 'actions';

export default React.memo ( Service );

function Service ()
{
	const dispatch = useDispatch(),
		{ serviceName } = useParams(),
		[ isOpen, setOpen ] = useState(false),
		[ currentId, setCurrentId ] = useState(),
		[ disabled, setDisabled ] = useState(false),
		[ { result: { title, statements = [], transition_link: serviceLink } = {} },, error ] = useRequest ( 'getService', [ serviceName ] ),
		[ createDraftStatement, waiter ] = useCreateDraftStatement(),
		onConfirmCreation = useCallback (
			() => {
				setDisabled(true)
				createDraftStatement ( currentId, undefined, true )
			},
			[createDraftStatement, currentId]
		),
		onClickLink = useCallback (
			( id ) => {
				setCurrentId(id);
				setOpen(true);
			},
			[]
		);

	useEffect (
		() => {
			dispatch (
				actions.setServiceLink ( serviceLink )
			);
		},
		[ serviceLink, dispatch ]
	);

	return (
		<StatementWrapper rightPanel>
			<div className="lc-left-side-block col">
				<ReturnButton />
			</div>
			<div className="lc-content-block col">
				<div className="heading-block page-title">
					<h2 className="h fw-normal dark-gray">{ title }</h2>
				</div>
				<div className="heading-block lc-form-heading with-link">
					<h4 className="h"> </h4>
				</div>
				<div className="space-block" style={{ height: 20 }}></div>
				<div className="heading-block accent">
					<h4 className="h">Заявления по государственной услуге</h4>
				</div>
				<div className="links-block">
					{ !!error && error.message }
					{ statements.map (
						({ id, title }) => (
							<div
								key={id}
								onClick={() => onClickLink(id)}
								className="links-block__link"
							>
								<span>{ title }</span>
								<i className="base-icon-next-3" />
							</div>
						)
					) }
				</div>
			</div>
			{ waiter &&
				<Waiter />
			}
			<StatementInfoModal
				onConfirm={onConfirmCreation}
				onCancel={() => setOpen(false)}
				open={isOpen}
				disabled={disabled}
			/>
		</StatementWrapper>
	);
}
