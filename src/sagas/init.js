import { put, delay } from 'redux-saga/effects';
import actions from 'actions';
import api from 'api';
import { helpRoute } from 'urls';

export default function* init ()
{
	yield put ( actions.login() );
	yield initMenu();
}

export function* initMenu ()
{
	const { result: externalLinks, error } = yield api.web.getExternalLinks();

	if ( error )
	{
		yield put ( actions.error ( error ) );

		yield delay ( 1000 );

		yield initMenu();
	}
	else
	{
		const links = externalLinks.concat ({ title: 'Поддержка пользователей', to: helpRoute });

		yield put ( actions.setMenuLinks ( links ) )
	}
}
