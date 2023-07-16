import React, { useEffect, useCallback, useState, useRef, useMemo } from 'react';
import { useHistory } from 'react-router';
import api from 'api';
import reduxStore from 'reduxStore';
import actions from 'actions';
import { saveData } from 'functions';
import {
	panelRoute,
	statementRoute
} from 'urls';
import { ReferredModal } from 'components';

export function ScrollToTop() {
	const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });

    return () => {
      unlisten();
    }
  }, [history]);

  return null;
}

export function useField ( initial = '' )
{
	const [ value, setValue ] = useState ( initial ),
		setRawValue = useCallback (
			e => setValue ( e.target.value ),
			[]
		);

	return [ value, setRawValue, setValue ];
}

export function useRequest ( methodName, args = [], skipErrorAction )
{
	args = [].concat ( args );

	const [ response, setResponse ] = useState ( {} ),
		[ waiter, setWaiter ] = useState ( false ),
		[ error, setError ] = useState ( false ),
		request = useCallback (
			( status, methodName, args ) => {
				if ( status.canceled ) return;

				setWaiter ( true );

				api.web[ methodName ]( ...args )
					.then ( response => {
						if ( status.canceled ) return;

						setWaiter ( false );

						if ( response.error )
						{
							setError ( response.error );
							if ( !skipErrorAction ) reduxStore.dispatch ( actions.error ( response.error ) );
						}
						else
						{
							setResponse ( response );
							setError ( false );
						}
					} );
			},
			[ skipErrorAction ]
		),
		refreshStarterRef = useRef ( false ),
		[ refreshStarter, setRefreshStarter ] = useState ( false ),
		// Инициирует повторный запрос.
		refresh = useCallback (
			() => {
				refreshStarterRef.current = !refreshStarterRef.current;

				setRefreshStarter ( refreshStarterRef.current );
			},
			[]
		);

		useEffect (
			() => {
				const status = { canceled: false };

				request ( status, methodName, args );

				return () => status.canceled = true;
			},
			// eslint-disable-next-line react-hooks/exhaustive-deps
			[ ...args, methodName, refreshStarter ]
		);

	return useMemo (
		() => [ response, waiter, error, refresh ],
		[ response, waiter, error, refresh ]
	);
}

export function useEffectSkipFirst ( callback, args )
{
	const first = useRef ( true );

	useEffect (
		() => {
			if ( first.current )
			{
				first.current = false;

				return;
			}

			return callback();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		args
	);
}

export function useRefCallback ( callback )
{
	const ref = useRef ( callback );

	useEffect (
		() => {
			ref.current = callback;
		},
		[ callback ]
	);

	return useCallback (
		( ...args ) => ref.current ( ...args ),
		[]
	);
}

export function useDownload ( id, name, methodName = 'downloadStatement' )
{
	const [ waiter, setWaiter ] = useState ( false ),
		download = useCallback (
			() => {
				setWaiter ( true );

				api.web[ methodName ] ( id )
					.then ( ({ error, result }) => {
						if ( error ) throw error.message;

						saveData ( result, name );

						setWaiter ( false );
					} )
					.catch ( error => {
						setWaiter ( false );

						alert ( error );
					} );
			},
			[ id, name, methodName ]
		);

	return [ waiter, download ];
}

export function useLegalData ( { roles, snils, first_name, last_name, middle_name }, short )
{
	return useMemo (
		() => {
			if ( !roles ) return [ null, null ];

			const types = new Set();

			let OGRN,
				name;

			for ( let i = 0; i < roles.length; i++ )
			{
				const { type, ogrn, shortName, fullName } = roles[ i ];

				types.add ( type );

				if ( type === 'LEGAL' && typeof OGRN === 'undefined' )
				{
					OGRN = ogrn || '';
					name = short ? shortName : fullName;
				}
			}

			if ( types.has ( 'AGENCY' ) ) return [ null, null, null ];
			else if ( types.has ( 'LEGAL' ) ) return [ name, 'юридическое лицо', `ОГРН: ${ OGRN }` ];

			name = [ first_name, last_name, middle_name ].filter ( Boolean ).join ( ' ' );

			if ( types.has ( 'BUSINESS' ) ) return [ name, 'индивидуальный предприниматель', `СНИЛС: ${ snils }` ];

			return [ name, 'физическое лицо', `СНИЛС: ${ snils }` ];
		},
		[ roles, snils, first_name, last_name, middle_name, short ]
	);
}

export function useCreateDraftStatement ()
{
	const [ waiter, setWaiter ] = useState ( false ),
		history = useHistory(),
		createDraftStatement = useCallback (
			( id, parentId, pushPanel ) => {
				setWaiter ( true );

				api.web.createDraftStatement ( id, parentId )
					.then ( ({ result: { id } = {}, error }) => {
						if ( error ) throw error.message || 'Ошибка при создании заявления';

						if ( pushPanel ) history.push ( panelRoute );
						history.push ( `${ statementRoute }/${ id }/edit` );
					} )
					.catch ( err => {
						alert ( err );

						setWaiter ( false );
					} );
			},
			[ history ]
		);

	return [ createDraftStatement, waiter ];
}

export function useReferredModal ( id )
{
	const [ isOpen, setIsOpen ] = useState ( false ),
		open = useCallback ( () => setIsOpen ( true ), [] ),
		close = useCallback ( () => setIsOpen ( false ), [] ),
		Modal = useCallback (
			() => <ReferredModal.Modal {...{ id, isOpen, open, close }} />,
			[ id, isOpen, open, close ]
		),
		Button = useCallback (
			() => <ReferredModal.Button onClick={ open } />,
			[ open ]
		);

	return [ Modal, Button, open ];
}

export function useWhyDidYouUpdate ( name, props )
{
	// Get a mutable ref object where we can store props ...
	// ... for comparison next time this hook runs.
	const previousProps = useRef();

	useEffect ( () => {
		if ( previousProps.current )
		{
			// Get all keys from previous and current props
			const allKeys = Object.keys ({ ...previousProps.current, ...props });
			// Use this object to keep track of changed props
			const changesObj = {};
			// Iterate through keys
			allKeys.forEach ( key => {
				// If previous is different from current
				if ( previousProps.current[ key ] !== props[ key ])
				{
					// Add to changesObj
					changesObj[ key ] = {
						from: previousProps.current[ key ],
						to: props[ key ]
					};
				}
			} );

			// If changesObj not empty then output to console
			if ( Object.keys ( changesObj ).length )
			{
				console.log ( '[why-did-you-update]', name, changesObj );
			}
		}

		// Finally update previousProps with current props for next hook call
		previousProps.current = props;
	} );
}
