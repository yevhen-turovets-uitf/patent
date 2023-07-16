/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Block from './Block';
import FilledSignatureSection from './FilledSignatureSection';
import { RoundedButton } from 'components';
import { useDispatch } from 'react-redux'; 
import actions from 'actions';


export default React.memo ( FilledSection );

function FilledSection ({ i, id, normalizedId, fillableId, sectionId, sectionOptions, short_title, many, single, last, is_external })
{
	const classes = useStyles(),
		dispatch = useDispatch(),
		onClick = useCallback (
			e => {
				e.preventDefault();

				if ( window.confirm ( 'Вы действительно хотите удалить запись?' ) )
				{
					dispatch (
						actions.removeStatementSectionRequest ( sectionId, id )
					);
				}
			},
			[ sectionId, id, dispatch ]
		);

	if ( is_external ) return false;

	if ( !last && sectionOptions.isAttachment ) return (
		<div className="file-row file-row-with-details with-inputs gray-box">
			<Block
				readOnly
				forcedType="CONTAINER"
				{...{ normalizedId, sectionOptions }}
			/>
			<RoundedButton red className="delete" {...{ onClick }}>
				Удалить
			</RoundedButton>
		</div>
	);

	if ( !last && sectionOptions.isThirdPartySignature ) return (
		<FilledSignatureSection onRemove={ onClick } {...{ normalizedId }} />
	);

	return (
		<div className={ classes.section }>
			{ !!many && !sectionOptions.isAttachment && !sectionOptions.isThirdPartySignature &&
				<div className={ classes.row }>
					<h5>{ short_title } { i + 1 }</h5>
					{ !single &&
						<RoundedButton
							red
							className={ classes.delete }
							{...{ onClick }}
						>
							Удалить запись
						</RoundedButton>
					}
				</div>
			}
			<Block forcedType="CONTAINER" {...{ normalizedId, fillableId, sectionId, sectionOptions }} />
		</div>
	);
}


const useStyles = makeStyles ({
	section: {
		marginTop: 40,
		'&:hover' : {
			'& $delete': {
				opacity: 1
			}
		}
	},
	row: {
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: 20
	},
	delete: {
		opacity: 0
	}
});
