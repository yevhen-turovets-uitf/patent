import auth from './auth';
import user from './user';
import statement from './statement';
import ui from './ui';
import notifications from './notifications';
import statements from './statements';
import history from './history';
import openRegisters from './openRegisters';
import productClassifiers from './productClassifiers';
import industrialClassifiers from './industrialClassifiers';
import patentAttorneys from './patentAttorneys';

const reducers = {
	auth,
	user,
	statement,
	ui,
	notifications,
	statements,
	history,
	openRegisters,
	productClassifiers,
	industrialClassifiers,
	patentAttorneys
};

export default reducers;
