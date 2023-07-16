import { actions as auth } from 'reducers/auth';
import { actions as user } from 'reducers/user';
import { actions as error } from 'reducers/error';
import { actions as statement } from 'reducers/statement';
import { actions as ui } from 'reducers/ui';
import { actions as notifications } from 'reducers/notifications';
import { actions as statements } from 'reducers/statements';
import { actions as history } from 'reducers/history';
import { actions as openRegisters } from 'reducers/openRegisters';
import { actions as productClassifiers } from 'reducers/productClassifiers';
import { actions as industrialClassifiers } from 'reducers/industrialClassifiers';
import { actions as patentAttorneys } from 'reducers/patentAttorneys';

const actions = {
	...auth,
	...user,
	...error,
	...statement,
	...ui,
	...notifications,
	...statements,
	...history,
	...openRegisters,
	...productClassifiers,
	...industrialClassifiers,
	...patentAttorneys
};

export default actions;