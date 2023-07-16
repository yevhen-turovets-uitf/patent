import React from 'react';
import { Modal, PrimaryButton } from 'components';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';


export default React.memo(AlertModal);

function AlertModal({ title, text, confirmButtonTitle = 'ОК', cancelButtonTitle = 'Отмена', onConfirm, onCancel, open, children }) {
	const classes = useStyles();

	return (
		<Modal className={classes.modal} onClick={onCancel} {...{ open }}>
			<h6 className={classes.title}>{title}</h6>
			<p className={classes.subtitle}>{text}</p>
			<div className={classes.buttons}>
				<PrimaryButton
					className={clsx(classes.button, classes.firstButton)}
					title={confirmButtonTitle}
					onClick={onConfirm}
				/>
				<PrimaryButton
					className={classes.button}
					lightGray
					title={cancelButtonTitle}
					onClick={onCancel}
				/>
			</div>
		</Modal>
	);
}


const useStyles = makeStyles(theme => ({
	...theme.styles.Modal,
	button: theme.styles.fullWidth
}));
