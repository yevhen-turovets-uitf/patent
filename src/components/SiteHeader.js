/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import { Menu, ProfileModal } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { useRefCallback } from 'hooks';
import actions from 'actions';
import clsx from 'clsx';


export default React.memo(SiteHeader);

function SiteHeader({ auth, className }) {
	const { backdrop, ...classes } = useStyles(),
		dispatch = useDispatch(),
		{ badge, show } = useSelector(st => st.notifications),
		items = useSelector(({ ui }) => ui.menuLinks),
		[drawer, setDrawer] = useState(false),
		[slide, setSlide] = useState(false),
		[slideItems, setSlideItems] = useState([]),
		openDrawer = useCallback(
			() => setDrawer(true),
			[]
		),
		closeDrawer = useCallback(
			() => setDrawer(false),
			[]
		),
		showNotifications = useCallback(
			() => dispatch(actions.showNotifications(true)),
			[dispatch]
		),
		hideNotifications = useCallback(
			() => dispatch(actions.showNotifications(false)),
			[dispatch]
		),
		handelResize = useRefCallback(
			() => {
				if (drawer) closeDrawer();
				if (show) hideNotifications();
			},
			[]
		),
		menuCallback = useCallback(
			({ items, slideBack } = {}) => {
				if (Array.isArray(items) && items.length) {
					setSlideItems([
						{ title: 'Назад', slideBack: true },
						...items
					]);

					setSlide(true);
				}
				else if (slideBack) setSlide(false);
				else closeDrawer();
			},
			[closeDrawer, setSlide]
		);

	useEffect(
		() => {
			window.addEventListener('resize', handelResize);

			return () => window.removeEventListener('resize', handelResize);
		},
		[handelResize]
	);

	useCloseHelper(drawer, show, hideNotifications);
	useCloseHelper(show, drawer, closeDrawer);

	return (
		<React.Fragment>
			<div className={clsx('site-header', className)}>
				<div className="container">
					<div className="row">
						<div className="site-logo"><a href="/"><img src="/images/logo.svg" alt="Роспатент" /></a></div>
						<div className="navigation-col">
							<nav className="navigation">
								<Menu className="menu" {...{ items }} />
							</nav>
						</div>
						<div className="right col">
							{!!auth &&
								<React.Fragment>
									<ProfileModal />
									<div className={clsx('notifications-count', !!badge && 'has-notifications')}>
										<i className="base-icon-bell" onClick={show ? hideNotifications : showNotifications} />
									</div>
								</React.Fragment>
							}
							<div
								className={clsx('nav-butter', { active: drawer })}
								onClick={drawer ? closeDrawer : openDrawer}
							>
								<span /><span /><span />
							</div>
						</div>
					</div>
				</div>
			</div>
			<Drawer
				{...{ classes }}
				className="drawer"
				anchor="right"
				open={drawer}
				elevation={0}
				onClose={closeDrawer}
				ModalProps={useMemo(() => ({ BackdropProps: { classes: { root: backdrop } } }), [backdrop])}
				SlideProps={useMemo(() => ({ onExited: () => setSlide(false) }), [setSlide])}
			>
				<nav className="navigation show">
					{!!auth &&
						<div className="login-button">
							<ProfileModal onClickProfile={closeDrawer} onClickExit={closeDrawer}>
								<span>Мой профиль</span>
							</ProfileModal>
						</div>
					}
					<Menu drawer className="menu" callback={menuCallback} {...{ items }} />
					<Slide mountOnEnter unmountOnExit direction="left" in={slide}>
						<Menu drawer className="menu" callback={menuCallback} items={slideItems} />
					</Slide>
				</nav>
			</Drawer>
			<div className="header-space" />
		</React.Fragment>
	);
}

const useStyles = makeStyles({
	root: {
		zIndex: '90 !important'
	},
	paper: {
		maxWidth: 420,
		width: '100%'
	},
	backdrop: {
		backgroundColor: 'transparent'
	}
});

function useCloseHelper(kickOff, target, close) {
	useEffect(
		() => {
			if (kickOff && target) close();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[kickOff, close]
	);
}
