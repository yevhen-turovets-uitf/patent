import React, { useState, useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Waiter } from 'components';
import List from './List';
import { useSelector, useDispatch } from 'react-redux';
import actions from 'actions';
import clsx from 'clsx';
import api from 'api';
import { saveData } from 'functions';
const titles = [ 'Текущие', 'Черновики' ],
	downloadCSV = search => api.web.getFilledStatementsCSV ({ search })
		.then ( ({ error, result }) => error ? alert ( error.message ) : saveData ( result, 'результаты.csv' ) );


export default React.memo ( Statements );

function Statements ()
{
	const classes = useStyles(),
		dispatch = useDispatch(),
		{ lists, index, search, searchBar, waiter } = useSelector ( st => st.statements ),
		[ counts, setCounts ] = useState ( [] ),
		[ renderFiltered, setRenderFiltered ] = useState ( false ),
		onChange = useCallback (
			i => dispatch ( actions.statementsSetIndex ( i ) ),
			[ dispatch ]
		),
		statementsSearchBar = useCallback (
			status => dispatch ( actions.statementsSearchBar ( status ) ),
			[ dispatch ]
		),
		statementsSearch = useCallback (
			search => dispatch ( actions.statementsSearch ( search ) ),
			[ dispatch ]
		),
		onChangeSearch = useCallback (
			e => statementsSearch ( e.target.value ),
			[ statementsSearch ]
		);

	useEffect (
		() => setCounts (
			lists.map ( l => l.total || 0 )
		),
		[ lists ]
	);

	useEffect (
		() => {
			let timer;

			if ( searchBar ) setRenderFiltered ( true );
			else
			{
				timer = setTimeout (
					() => {
						setRenderFiltered ( false );
						statementsSearch ( '' );
					},
					400
				);
			}

			return () => clearTimeout ( timer );
		},
		[ searchBar, statementsSearch ]
	);

	return (
		<div className={ classes.container }>
			<Tabs
				{...{ titles, counts, onChange }}
				value={ index }
				forcedActiveIndex={ searchBar && 2 }
				headerSlot={
					<React.Fragment>
						<div className="filter-buttons">
							<div className="search-b f-button" onClick={ () => statementsSearchBar ( true ) }><i className="base-icon-search"></i><span>Поиск</span></div>
							{/* <div className="sort-b f-button"><i className="base-icon-down"></i><span>Сначала новые</span></div>
							<div className="filter-b f-button"><i className="base-icon-filter"></i><span>Фильтр</span></div> */}
						</div>
						<div className={ clsx ( 'search-form-block', searchBar && 'active' ) }>
							<div className="search-form">
								<button className="submit base-icon-search" />
								<input className="input" type="text" placeholder="Поиск по заявкам" value={ search } onChange={ onChangeSearch } />
							</div>
							<div className="f-button close" onClick={ () => statementsSearchBar ( false ) }><i className="base-icon-cross-2"></i><span>Закрыть поиск</span></div>
							<div className="f-button download" onClick={ () => downloadCSV ( search ) }>
								<i className="base-icon-down-2"></i><span>Скачать результаты</span>
							</div>
						</div>
					</React.Fragment>
				}
			>
				<List status="PROCESSING,POSHLINA,PROVERKI,EPOS,EPOS_EZO,EGR" list={ lists[ 0 ] } />
				<List status="DRAFT" list={ lists[ 1 ] } />
				{ renderFiltered &&
					<List filtered list={ lists[ 2 ] } {...{ search }} />
				}
			</Tabs>
			{ waiter &&
				<Waiter />
			}
		</div>
	);
}


const useStyles = makeStyles ({
	container: {
		position: 'relative'
	}
});
