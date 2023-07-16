import React from 'react';
import { Link } from 'react-router-dom';


export default React.memo (
	React.forwardRef (
		( props, ref ) => <Menu { ...props } containerRef={ ref } />
	)
);

function Menu ({ containerRef, className, items, drawer, callback: onClick })
{
	return (
		<ul ref={ containerRef } {...{ className }}>
			{ items.map (
				({ title, link: href, to, children: items = [], slideBack }) => (
					<li key={ title + href + to }>
						{ to ?
							<Link {...{ to, onClick }}>
								<span>{ title }</span>
							</Link>
							:
							<a
								{...{ href }}
								target="_blank"
								onClick={ onClick ? () => onClick ({ items, slideBack }) : undefined }
							>
								{ !!slideBack &&
									<i className="base-icon-down-3" />
								}
								<span>{ title }</span>
								{ !!( drawer && items.length ) &&
									<i className="base-icon-up-3" />
								}
							</a>
						}
						{ !drawer && !!items.length &&
							<Menu {...{ items }} />
						}
					</li>
				)
			) }
		</ul>
	);
}
