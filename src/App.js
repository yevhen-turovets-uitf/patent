import 'scss/main.scss';
import 'scss/iconfont.scss';
import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import { HistoryController, RemoveStatementProvider } from 'components';
import { ScrollToTop } from 'hooks';
import { Root } from 'routes';
import theme from 'theme';

export default React.memo ( App );

function App ()
{
	return (
		<ThemeProvider {...{ theme }}>
			<Router>
				<ScrollToTop />{/* Нужен для прокрутки страницы вверх при смение роута */}
				<HistoryController />
				<LastLocationProvider>
					<RemoveStatementProvider>
						<Root />
					</RemoveStatementProvider>
				</LastLocationProvider>
			</Router>
		</ThemeProvider>
	);
}
