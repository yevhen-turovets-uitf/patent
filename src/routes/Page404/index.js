import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { StatementWrapper, PrimaryButton } from 'components';
import { useHistory } from 'react-router';
import {
	panelRoute,
	servicesRoute,
	objectsRoute
} from 'urls';

export default React.memo ( Page404 );

function Page404 ()
{
	const classes = useStyles(),
		history = useHistory();

	return (
		<StatementWrapper>
			<div className="page-404">
				<img src="/images/404.svg" alt="404 ошибка" />
				<h1>Страница не найдена</h1>
				<div className="text">
					Проверьте, правильно ли введен адрес, и попробуйте еще раз.
					<br />
					Если Вы искали что-то в Личном кабинете, Вам могут пригодится следующие разделы:
				</div>
				<div className='buttons'>
					<PrimaryButton outline className={ classes.button } title="Мои заявления и заявки" onClick={ () => history.push ( panelRoute ) } />
					<PrimaryButton outline className={ classes.button } title="Мои объекты" onClick={ () => history.push ( objectsRoute ) } />
					<PrimaryButton outline className={ classes.button } title="Подать заявку или заявление" onClick={ () => history.push ( servicesRoute ) } />
				</div>
			</div>
		</StatementWrapper>
	);
}


const useStyles = makeStyles ({
	row: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	button: {
		'&:not(:last-of-type)': {
			marginRight: 10
		}
	}
});
