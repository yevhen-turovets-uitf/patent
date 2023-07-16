import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import { ReturnButton, ProgressBlock, PrimaryButton, Waiter, StatementWrapper } from 'components';
import ExternalSections from './ExternalSections';
import Block from './Block';
import AddButton from './AddButton';
import SubmissionBlock from './SubmissionBlock';
import ValidateStatementButton from './ValidateStatementButton';
import StatementModal from './StatementModal';
import { getSectionOptions, getNormalizedId } from 'functions';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'actions';
import { statementRoute, openSourceRegistryLink } from 'urls';
import { useDownload } from 'hooks';

export default React.memo ( Statement );

const defaultArr = [],
	defaultObj = {};

function Statement ()
{
	const { statementId } = useParams(),
		dispatch = useDispatch(),
		{ id, isReferred, parent_id, title, sections = defaultArr, normalized = defaultObj, scrollTo, waiter, error } = useSelector ( ({ statement }) => statement ),
		[ downloadWaiter, download ] = useDownload ( statementId, title + '.pdf' ),
		[ index, setIndex ] = useState ( 0 ),
		sectionId = useMemo (
			() => ( sections[ index ] || {} ).id,
			[ sections, index ]
		),
		normalizedSectionId = useMemo (
			() => getNormalizedId ( sectionId, 'SECTION' ),
			[ sectionId ]
		),
		currentSection = normalized[ normalizedSectionId ] || defaultObj,
		sectionOptions = useMemo (
			() => getSectionOptions (
				( currentSection ).section_type
			),
			[ currentSection ]
		),
		{ title: sectionTitle, short_title, many } = currentSection,
		extraProps = useMemo (
			() => ({ short_title, many }),
			[ short_title, many ]
		),
		validateSections = useCallback (
			() => {
				if ( currentSection.section_type === 'Отправка заявления' ) return;
				
				dispatch (
					actions.validateSectionsRequest ( statementId, sectionId )
				);
			},
			[ statementId, sectionId, currentSection, dispatch ]
		),
		onClickNext = useCallback (
			() => {
				validateSections();
				setIndex ( i => i + 1 );
			},
			[ validateSections ]
		),
		onClickProgressItem = useCallback (
			i => {
				validateSections();
				setIndex ( i );
			},
			[ validateSections ]
		),
		hasExternal = !!( currentSection.external_sections && currentSection.external_sections.length );

	useEffect (
		() => {
			dispatch ( actions.resetStatement() );
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	useEffect (
		() => setIndex ( 0 ),
		[ id ]
	);

	useEffect (
		() => {
			if ( !sections[ index ] ) setIndex ( 0 );
			else if ( !sections[ index ].visible ) setIndex ( i => i + 1 );
		},
		[ sections, index ]
	);

	useEffect (
		() => {
			dispatch ( actions.requestStatement ( statementId ) );
		},
		[ statementId, dispatch ]
	);

	useEffect (
		() => {
			if ( !scrollTo ) return;

			const index = sections.findIndex (
				({ id, visible }) => visible && id === scrollTo.sectionId
			);

			if ( index !== -1 ) setIndex ( index );
		},
		[ scrollTo, sections ]
	);

	return (
		<StatementWrapper printButton statementId={ id } statementName={ title } {...{ isReferred }}>
			<div className="lc-left-side-block col">
				{ isReferred ?
					<ReturnButton
						title="Карточка заявления"
						to={ `${ statementRoute }/${ parent_id }` }
					/>
					:
					<ReturnButton />
				}
				<ProgressBlock onClick={ onClickProgressItem } {...{ sections, normalized, index, scrollTo }} />
			</div>
			<div className="lc-content-block col">
				<div className="heading-block page-title">
					<h2 className="h fw-normal dark-gray">{ title }</h2>
				</div>
				<div className="heading-block lc-form-heading">
					<h4 className="h">{ sectionTitle }</h4>
				</div>
				{ hasExternal &&
					<React.Fragment>
						<div className="lc-form external">
							<ExternalSections {...{ statementId, currentSection, normalized, many }} />
						</div>
						{ !!many &&
							<div className="heading-block lc-form-heading">
								<h4 className="h">Или введите данные вручную</h4>
							</div>
						}
					</React.Fragment>
				}
				<div className="lc-form">
					{ !!sectionOptions.isElectronicSignature &&
						<>
							<div className="lc-form__subtitle">
								Электронная подпись обязательна для юридических лиц.
							</div>
							<div className="lc-form__text-row">
								Шаг 1.
								{' '}
								<span
									onClick={ downloadWaiter ? undefined : download }
									className="lc-form__row-link"
								>Загрузите заполненное заявление</span>
								{' '}
								на Ваше устройство.
							</div>
							<div className="lc-form__text-row">
								Шаг 2. Сформируйте файл открепленной электронной подписи с помощью средства электронной подписи.
								{' '}
								<a 
									href={openSourceRegistryLink}
									target="_blank"
									rel="noreferrer"
									className="lc-form__row-link"
								>
									Выбрать в Реестре открытого программного обеспечения.
								</a>
							</div>
							<div className="lc-form__text-row">
								Шаг 3. Прикрепите полученный файл электронной подписи в форму ниже.
							</div>
						</>
					}
					{ !!sectionOptions.isThirdPartySignature &&
						<p>
							{ 'Прикрепите электронные подписи всех заинтересованных лиц, которыми вы располагаете.' }
							<br />
							<br />
							{ 'Это опциональный шаг, его можно пропустить.' }
						</p>
					}
					<Block
						normalizedId={ normalizedSectionId }
						sortByExternal={ hasExternal }
						{...{ sectionId, sectionOptions, extraProps }}
					/>
					<div className="button">
						{ !!error && error.message }
						{ sectionOptions.isStatementSubmission ?
							<SubmissionBlock {...{ id, isReferred }} />
							:
							<React.Fragment>
								{ !!( many && !sectionOptions.hideAddButton ) &&
									<AddButton
										icon={ sectionOptions.addButtonIcon }
										title={ sectionOptions.addButtonTitle || 'Добавить' }
										{...{ statementId, sectionId }}
									/>
								}
								{ !!sections.length &&
									<React.Fragment>
										<PrimaryButton
											title="Далее"
											onClick={ onClickNext }
										/>
										<ValidateStatementButton {...{ id }} />
									</React.Fragment>
								}
							</React.Fragment>
						}
					</div>
					{ (!!waiter || !!downloadWaiter) &&
						<Waiter absolute />
					}
				</div>
			</div>
			<StatementModal />
		</StatementWrapper>
	);
}
