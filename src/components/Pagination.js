/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useMemo, useEffect } from 'react';
import clsx from 'clsx';


export default React.memo ( Pagination );

function Pagination ({ max = 7, total, offset, limit, onClick })
{
	max = max < 7 ? 7 : max;

	if ( !( max % 2 ) ) max++;

	const getClickHandler = useCallback (
			val => e => {
				e.preventDefault();

				if ( val === '...' ) return;

				onClick ( val );
			},
			[ onClick ]
		),
		count = Math.ceil ( total / limit ) || 0,
		current = offset / limit,
		shoulder = ( max - 1 ) / 2,
		skipBreaks = count <= max,
		leftBreak = !skipBreaks && current > shoulder,
		rightBreak = !skipBreaks && count - current > shoulder,
		pages = useMemo (
			() => [ ...Array ( count ).keys() ],
			[ count ]
		),
		leftDisabled = current === 0,
		rightDisabled = current === pages.length - 1,
		arr = useMemo (
			() => {
				const begin = Math.min (
						Math.max ( current - shoulder, 0 ),
						Math.max ( count - max, 0 )
					),
					end = begin + max,
					arr = pages.slice ( begin, end );

				if ( leftBreak )
				{
					arr[ 0 ] = pages[ 0 ];
					arr[ 1 ] = '...';
				}

				if ( rightBreak )
				{
					arr[ arr.length - 2 ] = '...';
					arr[ arr.length - 1 ] = pages[ pages.length - 1 ];
				}

				return arr;
			},
			[ max, pages, current, shoulder, leftBreak, rightBreak, count ]
		);

	useEffect (
		() => {
			if ( offset >= total && current > 0 ) onClick ( current - 1 );
		},
		[ total, offset, current, onClick ]
	);

	if ( count < 2 ) return null;

	return (
		<div className="pagintaion">
			<a
				className={ clsx ( 'first', leftDisabled && 'disabled' ) }
				href="#"
				onClick={ getClickHandler ( leftDisabled ? '...' : current - 1 ) }
			>
				<i className="base-icon-back-2" />
			</a>
			{ arr.map (
				( val, i ) => ( val === current ?
					<span key={ i }>{ val + 1 }</span>
					:
					<a
						key={ i }
						href="#"
						onClick={ getClickHandler ( val ) }
					>
						{ val === '...' ? val : val + 1 }
					</a>
				)
			) }
			<a
				className={ clsx ( 'last', rightDisabled && 'disabled' ) }
				href="#"
				onClick={ getClickHandler ( rightDisabled ? '...' : current + 1 ) }
			>
				<i className="base-icon-next-2" />
			</a>
		</div>
	);
}
