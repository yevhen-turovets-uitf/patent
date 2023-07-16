import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';


export default React.memo ( PrimaryButton );

function PrimaryButton ({ className = false, title, add, lightGray, outline, disabled, icon = add && 'person-add', ...rest })
{
	const classes = useStyles();

	return (
		<button className={ clsx ( 'button-style1', className, {
				'outline': !!outline,
				'add-button': !!add,
				'light-gray': !!lightGray,
				[ classes.disabled ]: disabled
			} ) }
			{...{ disabled }}
			{ ...rest }
		>
			{ !!icon &&
				<i className={ 'base-icon-' + icon } />
			}
			<span>{ title }</span>
		</button>
	);
}


const useStyles = makeStyles ( theme => ({
	disabled: theme.styles.disabled
}) );
