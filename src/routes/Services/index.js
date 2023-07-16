/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useCallback, useMemo } from 'react';
import { Link } from "react-router-dom";
import { Tabs } from 'components';
import { servicesRoute } from 'urls';
import { useRequest } from 'hooks';
import clsx from 'clsx';

export default React.memo ( Services );

const titles = [ 'Список услуг', 'Объекты интеллектуальной собственности' ];

function Services ()
{
	const [ currentGroup, setCurrentGroup ] = useState ( null ),
		[ index, setIndex ] = useState ( 0 ),
		[ { result: { services = [], groups = [] } = {} }, /* waiter */, error ] = useRequest ( 'getServices' ),
		onClickGroup = useCallback (
			( e, group ) => {
				e.preventDefault();

				setCurrentGroup ( group );
				setIndex ( 0 );
			},
			[]
		),
		reset = useCallback (
			() => {
				setCurrentGroup ( null );
				setIndex ( 1 );
			},
			[]
		),
		filteredServices = useMemo (
			() => !currentGroup ? services : services.filter ( ({ groups = [] }) => groups.includes ( currentGroup.id ) ),
			[ services, currentGroup ]
		);

	return (
		<div className="tabs-send-request tabs-block">
			{ !!currentGroup &&
				<a class="return-button type2" href="#" onClick={ reset }>
					<i class="icon base-icon-back" />
					<span class="label">{ currentGroup.title }</span>
				</a>
			}
			<Tabs
				{...{ titles }}
				onChange={ setIndex }
				value={ index }
				hideButtons={ !!currentGroup }
			>
				<div className="links-row">
					<div className="links">
						{ !!error && error.message }
						{ filteredServices.map (
							({ id, title }) => (
								<Link key={ id } to={ `${ servicesRoute }/${ id }` }>
									<span>{ title }</span>
									<i className="base-icon-next-3" />
								</Link>
							)
						) }
					</div>
				</div>
				<div className="icon-box-row row">
					{ groups.map ( ({ id, title, icon }) => (
						<div key={ id } className="col-12 col-md-6 col-lg-4">
							<div className="icon-box">
								<div className={ clsx ( 'icon', !!icon && `base-icon-${ icon }`) } />
								<div className="title">{ title }</div>
								<a href={ `#${ title }` } onClick={ e => onClickGroup ( e, { id, title } ) } />
							</div>
						</div>
					) ) }
				</div>
			</Tabs>
		</div>
	);
}
