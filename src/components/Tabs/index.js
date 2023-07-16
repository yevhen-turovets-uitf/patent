import React from 'react';
import Tab from './Tab';
import clsx from 'clsx';


export default React.memo ( Tabs );

function Tabs ({ titles, counts = [], headerSlot = null, forcedActiveIndex = false, value = 0, hideButtons = false, onChange, children })
{
	return (
		<div className="tabs-block">
			{ !hideButtons &&
				<div className="tb-buttons">
					<div className="buttons">
						{ titles.map ( ( title, i ) => (
							<div
								key={ title }
								className={ clsx ( 'button', i === value && 'current' ) }
								onClick={ () => onChange ( i ) }
							>
								<span className="label">{ title }</span>
								{ !!counts[ i ] &&
									<span className="count">{ counts[ i ] }</span>
								}
							</div>
						) ) }
					</div>
					<div className="mob-tab-buttons">
						<select onChange={ e => onChange ( parseInt ( e.target.value, 10 ) ) } {...{ value }}>
							{ titles.map ( ( title, i ) => (
								<option key={ i } value={ i }>{ title }{ !!counts[ i ] && ` (${ counts[ i ] })` }</option>
							) ) }
						</select>
					</div>
					{ headerSlot }
				</div>
			}
			{ React.Children.map (
				children,
				( child, i ) => child === null ? null : <Tab key={ i } isOpen={ i === ( forcedActiveIndex === false ? value : forcedActiveIndex ) }>{ React.cloneElement ( child, { i } ) }</Tab>
			) }
		</div>
	);
}
