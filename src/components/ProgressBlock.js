import React from 'react';
import { getNormalizedId } from 'functions';
import clsx from 'clsx';


export default React.memo(ProgressBlock);

function ProgressBlock({ classes, sections = [], normalized, index, onClick }) {
	return (
		<div className="progress-block">
			{ sections.map(
				({ id, title, short_title: shortTitle, visible }, i) => {
					if (!visible) return null;

					const { invalidFields, valid, empty } = normalized[getNormalizedId(id, 'SECTION')],
						current = i === index,
						invalid = !!invalidFields,
						completed = !current && i <= index,
						successed = !empty && valid;

					return (
						<div
							key={id}
							className={clsx('item', {
								current,
								completed,
								successed,
								invalid
							})}
							onClick={current ? undefined : () => onClick(i)}
						>
							{!current && <i className="base-icon-check" />}
							<span>{shortTitle || title}</span>
						</div>
					);
				}
			)}
		</div>
	);
}
