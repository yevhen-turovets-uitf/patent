import React from 'react';
import { useSelector } from 'react-redux';


export default React.memo ( SignatureCard );

function SignatureCard ({ title, name, onRemove })
{
	const user = useSelector ( ({ user }) => user );

	return (
		<div className="file-row uploaded gray-box">
			<div className="shield">
				<img src="/images/uploaded.svg" alt={ title } />
			</div>
			<div className="content">
				<div className="title">{ title }</div>
				<div className="name">
					{ name ? name :
						<React.Fragment>
							{ user.first_name } { user.last_name } { user.middle_name }
						</React.Fragment>
					}
				</div>
			</div>
			<div className="delete base-icon-delete" onClick={ onRemove } />
		</div>
	);
}
