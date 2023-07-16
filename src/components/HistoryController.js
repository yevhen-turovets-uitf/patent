import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useStore } from 'react-redux';
import actions from 'actions';


export default React.memo ( HistoryController );

function HistoryController ()
{
	const last = useRef ( null ),
		history = useHistory(),
		stack = useSelector ( st => st.history.stack ),
		store = useStore();

	useEffect (
		() => {
			if ( stack[ 0 ] && last.current !== stack[ 0 ] )
			{
				last.current = stack[ 0 ];

				const { name, args } = stack[ 0 ];

				history[ name ] ( ...args );
			}
		},
		[ stack, history ]
	);

	useEffect (
		() => {
			const unsubscribe = history.listen (
				() => {
					if ( store.getState().ui.page404 )
					{
						store.dispatch ( actions.page404 ( false ) );
					}
				}
			);

			return () => unsubscribe();
		},
		[ history, store ]
	);

	return null;
}
