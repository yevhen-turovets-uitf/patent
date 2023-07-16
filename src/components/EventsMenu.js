import React, { useState, useCallback } from 'react';
import Popover from '@material-ui/core/Popover';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
const anchorOrigin = {
		vertical: 'top',
		horizontal: 'right'
	},
	transformOrigin = {
		vertical: 'top',
		horizontal: 'right'
	};


export default React.memo ( EventsMenu );

function EventsMenu ({ className = false, children })
{
	const classes = useStyles(),
		[ anchorEl, setAnchorEl ] = useState ( null ),
		handleOpen = useCallback (
			e => setAnchorEl ( e.currentTarget ),
			[]
		),
		handleClose = useCallback (
			() => setAnchorEl ( null ),
			[]
		),
		onClick = useCallback (
			e => e.target.tagName === 'A' && handleClose(),
			[ handleClose ]
		);

	return (
		<div className={ clsx ( 'events', className ) }>
			<i
				className="base-icon-more-vert"
				onClick={ handleOpen }
			/>
			<Popover
				classes={{ paper: classes.paper }}
				open={ !!anchorEl }
				TransitionComponent={ Fade }
				transitionDuration={ 300 }
				onClose={ handleClose }
				{...{ anchorEl, anchorOrigin, transformOrigin, onClick }}
			>
				{ children }
			</Popover>
		</div>
	);
}


const useStyles = makeStyles ( theme => ({
	paper: {
		borderRadius: 4,
		background: '#FFF',
		fontWeight: 500,
		fontSize: 14,
		lineHeight: '20px',
		color: '#54566C',
		minWidth: 162,
		overflow: 'hidden',
		padding: '10px 0',
		'& a': {
			display: 'block',
			padding: '6px 15px',
			color: 'inherit',
			cursor: 'pointer',
			'&:hover': {
				background: '#CBD3E2'
			}
		}
	}
}) );
