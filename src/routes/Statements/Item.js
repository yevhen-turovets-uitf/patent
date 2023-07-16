/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useState } from 'react';
import { EventsMenu, StatementImage, StatementInfoModal } from 'components';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { RemoveStatement } from 'context';
import { getStatusName } from 'functions';
import { useDispatch } from 'react-redux';
import { useDownload } from 'hooks';
import actions from 'actions';
import moment from 'moment';
import clsx from 'clsx';
import { statementRoute } from 'urls';

export default React.memo ( withRouter ( Item ) );

function Item ({ id, reg_number, date_time, status, title, service_title, has_image, highlighted = false, withComment = false, history })
{
	const classes = useStyles(),
		dispatch = useDispatch(),
		[ isOpen, setOpen ] = useState(false),
		[ disabled, setDisabled ] = useState(false),
		onClick = useCallback (
			() => history.push ( `${ statementRoute }/${ id }` ),
			[ history, id ]
		),
		editStatement = useCallback (
			() => history.push ( `${ statementRoute }/${ id }/edit` ),
			[ history, id ]
		),
		[ waiter, download ] = useDownload ( id, title + '.pdf' ),
		copyStatement = useCallback (
			() => dispatch ( actions.copyStatementRequest ( id ) ),
			[ id, dispatch ]
		),
		onClickLink = useCallback (
			() => setOpen(true),
			[]
		),
		onConfirmCreation = useCallback (
			() => {
				setDisabled(true);
				copyStatement();
			},
			[copyStatement]
		);

	return (
		<div className={ clsx ( 'ptn-item', { highlighted, 'with-comment': withComment } ) }>
			<EventsMenu>
				{ status === 'PROCESSING' ?
					<a {...{ onClick }}>Просмотр</a>
					:
					<a onClick={ editStatement }>Редактировать</a>
				}
				<a onClick={ onClickLink }>Копировать</a>
				<a onClick={ waiter ? undefined : download }>Распечатать</a>
				{ status === 'DRAFT' &&
					<RemoveStatement.Consumer>
						{ openRemoveStatementAlert => (
							<a
								className={ classes.remove }
								onClick={ () => openRemoveStatementAlert ( id ) }
							>
								Удалить
							</a>
						) }
					</RemoveStatement.Consumer>
				}
			</EventsMenu>
			<div className="wrap">
				{ !!has_image &&
					<StatementImage {...{ id }} />
				}
				<div className="content">
					<div className="top">
						<div className="number" style={{ cursor: 'pointer' }} {...{ onClick }}>{ reg_number !== null ? reg_number : id }</div>
						<div className="date">{ moment ( date_time ).format ( 'DD.MM.YYYY' ) }</div>
						<div className="msg">{ getStatusName ( status ) }</div>
					</div>
					<div style={{ cursor: 'pointer' }} {...{ onClick }}>
						<div className="title">{ title }</div>
						<div className="description">{ service_title }</div>
					</div>
				</div>
			</div>
			{ withComment &&
				<a className="comment-button" href="#">
					<i className="base-icon-message" />
				</a>
			}
			<StatementInfoModal
				onConfirm={onConfirmCreation}
				onCancel={() => setOpen(false)}
				open={isOpen}
				disabled={disabled}
			/>
		</div>
	);
}


const useStyles = makeStyles ( theme => ({
	remove: {
		color: [ theme.palette.common.red, '!important' ]
	}
}) );
