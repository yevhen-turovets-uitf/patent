import React, { useState, useCallback, useMemo } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';


export default React.memo ( Modal );

function Modal ({ className, open, children, onClose })
{
	const classes = useStyles(),
		[ hovered, setHovered ] = useState ( false ),
		stopPropagation = useCallback (
			e => e.stopPropagation(),
			[]
		),
		onMouseOver = useCallback (
			() => setHovered ( true ),
			[]
		),
		onMouseOut = useCallback (
			() => setHovered ( false ),
			[]
		),
		BackdropProps = useMemo (
			() => ({
				className: clsx ( classes.hoverable, {
					[ classes.hovered ]: hovered
				} )
			}),
			[ hovered, classes ]
		);

	return (
		<Dialog
			disableEscapeKeyDown={ !onClose }
			disableBackdropClick={ !onClose }
			{...{ open, BackdropProps, onClose, onMouseOver, onMouseOut }}
		>
			<div className={ clsx ( className, 'account-popup' ) } onMouseOver={ stopPropagation }>
				{ children }
			</div>
		</Dialog>
	);
}


const useStyles = makeStyles ({
	hovered: {
		backgroundColor: 'rgba(255, 255, 255, 0.95)'
	},
	hoverable: {
		transition: '300ms ease !important',
		transitionProperty: 'background-color opacity !important'
	}
});
