import React, { useState, useCallback } from 'react';
import { Modal } from 'components';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useLegalData } from 'hooks';
import { profileRoute } from 'urls';

export default React.memo ( ProfileModal );

function ProfileModal ({ user, children, logout, onClickProfile, onClickExit })
{
	const classes = useStyles(),
		[ name, legalStatus, legalId ] = useLegalData ( user, 'short' ),
		[ open, setOpen ] = useState ( false ),
		onOpen = useCallback (
			() => setOpen ( true ),
			[]
		),
		onClose = useCallback (
			() => setOpen ( false ),
			[]
		),
		profile = useCallback (
			() => {
				onClose();

				if ( onClickProfile ) onClickProfile();
			},
			[ onClose, onClickProfile ]
		),
		exit = useCallback (
			() => {
				onClose();
				logout();

				if ( onClickExit ) onClickExit();
			},
			[ onClose, logout, onClickExit ]
		);

	return (
		<React.Fragment>
			<div className="login-button" onClick={ onOpen }>
				<div className="icon base-icon-account" />
				{ children }
			</div>
			<Modal {...{ open, onClose }}>
				<div className="wrap">
					<div className="inner-wrap">
						<i className="icon base-icon-account"></i>
						<h6 className="name">{ name }</h6>
						<div className="subject-status">{ legalStatus }</div>
						<h6 className={ classes.legalId }>{ legalId }</h6>
						<Link className="profile-link" to={profileRoute} onClick={ profile }>мой профиль</Link>
						<button className="button-style1 outline close" onClick={ exit }>
							<span>Выйти</span>
						</button>
					</div>
				</div>
			</Modal>
		</React.Fragment>
	);
}


const useStyles = makeStyles ({
	legalId: {
		marginBottom: 25,
		fontFeatureSettings: '"tnum" on, "lnum" on',
		fontFamily: 'TT Wellingtons'
	}
});
