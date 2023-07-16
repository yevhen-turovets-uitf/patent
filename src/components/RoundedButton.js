import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';


export default React.memo ( RoundedButton );

function RoundedButton ({ className, red, disabled, ...rest })
{
	const classes = useStyles();

	return (
		<button className={ clsx ( classes.button, className, {
				[ classes.red ]: !!red,
				[ classes.disabled ]: disabled
			} ) }
			{...{ disabled }}
			{ ...rest }
		/>
	);
}


const useStyles = makeStyles ( theme => ({
	button: {
		width: 97,
		height: 20,
		borderRadius: 8,
		backgroundColor: 'transparent',
		fontSize: 12,
		padding: 0,
		border: 'none',
		transition: 'all 400ms ease',
		cursor: 'pointer',
		color: '#0039A6',
		'&:hover': {
			color: '#FFF',
			backgroundColor: '#0039A6'
		},
		'&:active': {
			color: '#FFF',
			background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #0039A6'
		}
	},
	red: {
		color: '#D52B1E',
		'&:hover': {
			backgroundColor: '#D52B1E'
		},
		'&:active': {
			backgroundColor: '#A31E14'
		}
	},
	disabled: theme.styles.disabled
}) );
