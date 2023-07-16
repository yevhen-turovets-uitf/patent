import React, { useMemo, useState, useCallback } from 'react';
import Collapse from '@material-ui/core/Collapse';
import { getCard } from 'functions';
import clsx from 'clsx';


export default React.memo ( ExternalCard );

function ExternalCard ({ normalizedId, normalized, defaultTitle })
{
	const { title, rows } = useMemo (
			() => getCard ( normalizedId, normalized, defaultTitle ),
			// eslint-disable-next-line react-hooks/exhaustive-deps
			[ normalizedId ]
		),
		[ open, setOpen ] = useState ( false ),
		toggle = useCallback (
			() => setOpen ( open => !open ),
			[]
		);

	return (
		<div className="user-info">
			<h6 onClick={ toggle }>
				{ title }
				<i className={ clsx ( 'base-icon-down-3', !open && 'active' ) } />
			</h6>
			<Collapse in={ open } timeout={ 400 }>
				<div className="dropdown">
					{ rows.map (
						( row, i ) => <p key={ i }>{ row }</p>
					) }
				</div>
			</Collapse>
		</div>
	);
}
