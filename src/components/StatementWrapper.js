import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { Print } from 'components';


export default React.memo ( StatementWrapper );

function StatementWrapper ({ printButton, rightPanel, statementId, statementName, isReferred, children })
{
	const classes = useStyles(),
		serviceLink = useSelector ( ({ statement: { serviceLink } }) => serviceLink );

	return (
		<main>
			<div className="cols-container container">
				<div className="row">
					{ children }
					{ !!( rightPanel || printButton ) &&
						<div className="lc-right-block col">
							{ !!printButton &&
								<Print
									className={ classes.printButton }
									title={ `Сформировать ${ isReferred ? 'документ' : 'заявление' }` }
									{...{ statementId, statementName }}
								/>
							}
							<a className="slink-block" href={ serviceLink || undefined } target="_blank" rel="noopener noreferrer">
								<img src="/images/shield2.svg" alt="Подробнее о данной государственной услуге" />
								<span>Подробнее о данной государственной услуге</span>
							</a>
							{ !isReferred &&
								<NavLink className="slink-block accent" to="/panel/services">
									<img src="/images/shield.svg" alt="Другие государственные услуги" />
									<span>Другие государственные услуги</span>
								</NavLink>
							}
						</div>
					}
				</div>
			</div>
		</main>
	);
}


const useStyles = makeStyles ({
	printButton: {
		marginBottom: 15,
		width: '100%'
	}
});
