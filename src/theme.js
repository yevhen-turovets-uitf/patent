import { createMuiTheme } from '@material-ui/core/styles';


export default createMuiTheme({
	palette: {
		common: {
			red: '#D52B1E'
		}
	},
	overrides: {
		MuiBackdrop: {
			root: {
				backgroundColor: 'rgba(255, 255, 255, 0.99)'
			}
		},
		MuiDialog: {
			paper: {
				boxShadow: '0px 9px 18px rgba(0, 0, 0, 0.1)',
				borderRadius: 10
			}
		},
		MuiPopover: {
			paper: {
				boxShadow: '0px 10px 22px rgba(44, 116, 255, 0.15)'
			}
		}
	},
	styles: {
		Modal: {
			modal: {
				width: '100%',
				maxWidth: 454,
				padding: [[32, 24]],
				'@media (max-width: 767.98px)': {
					padding: [[20, 14]],
				}
			},
			title: {
				lineHeight: 1.3
			},
			subtitle: {
				color: '#151515',
				fontSize: 14,
				margin: '17px 0 0'
			},
			buttons: {
				marginTop: 30
			},
			firstButton: {
				marginBottom: 15
			}
		},
		fullWidth: {
			width: '100%'
		},
		disabled: {
			opacity: 0.3,
			pointerEvents: 'none'
		}
	}
});
