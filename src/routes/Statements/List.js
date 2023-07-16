import React, { useCallback, useState, useEffect } from 'react';
import { Pagination } from 'components';
import Item from './Item';
import { useDebounce } from 'react-use';
import { useDispatch } from 'react-redux';
import actions from 'actions';
const limit = 10,
	defaultObj = {};


export default React.memo ( List );

function List ({ i, status, search, filtered, list = {} })
{
	const { total, error, params: initialParams = defaultObj, statements = [] } = list,
		[ offset, setOffset ] = useState ( initialParams.offset || 0 ),
		[ params, setParams ] = useState ({ limit: initialParams.limit || limit, offset, status, search }),
		setPage = useCallback (
			page => setOffset ( page * limit ),
			[ setOffset ]
		),
		dispatch = useDispatch();

	useEffect (
		() => setParams (
			params => ({ ...params, offset, status, search })
		),
		[ offset, status, search ]
	);

	useDebounce (
		() => {
			dispatch (
				actions.statementsRequest ( params, filtered, i )
			);
		},
		300,
		[ params, filtered, i, dispatch ]
	);

	return (
		<React.Fragment>
			<div className="ptn-items">
				{ statements.map ( row => <Item key={ row.id } { ...row } /> ) }
			</div>
			{ !!error && error.message }
			{ !!total &&
				<Pagination onClick={ setPage } {...{ total, limit, offset }} />
			}
		</React.Fragment>
	);
}
