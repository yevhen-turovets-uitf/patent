/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Waiter } from 'components';
import { useDownload } from 'hooks';
import clsx from 'clsx';


export default React.memo ( Print );

function Print ({ className, title='Распечатать', statementId, statementName, icon = 'print', asDiv, ...rest })
{
	const classes = useStyles(),
		[ waiter, download ] = useDownload ( statementId, statementName + '.pdf' );

	if ( asDiv ) return (
		<div style={{ cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={ waiter ? undefined : download }>{ title }</div>
	);

	return (
		<a
			className={ clsx ( 'button-style1', 'light-gray', waiter && classes.button, className ) }
			onClick={ waiter ? undefined : download }
			{ ...rest }
		>
			<i className={ 'base-icon-' + icon } />
			<span>{ title }</span>
			{ waiter &&
				<Waiter className={ classes.waiter } />
			}
		</a>
	);
}


const useStyles = makeStyles ({
	button: {
		cursor: 'default',
		opacity: 0.5
	},
	waiter: {
		transform: 'scale(0.4)'
	}
});
