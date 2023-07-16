import LcInfoLinks from './LcInfoLinks';
import { connect } from 'react-redux';


export default connect (
	({ user, ui }) => ({ statements: ui.statementsTotal || user.statements || 0, objects: 3 })
)( LcInfoLinks );
