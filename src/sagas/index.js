import { all, fork } from 'redux-saga/effects';
import init from './init';
import auth from './auth';
import error from './error';
import statement from './statement';
import notifications from './notifications';
import openRegisters from './openRegisters';
import productClassifiers from './productClassifiers';
import statements from './statements';
import ui from './ui';

export default function* root ()
{
	yield all ( [
		init,
		auth,
		error,
		statement,
		notifications,
		openRegisters,
		productClassifiers,
		statements,
		ui
	].map ( fork ) );
}
