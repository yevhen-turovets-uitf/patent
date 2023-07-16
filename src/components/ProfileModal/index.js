import ProfileModal from './ProfileModal';
import { connect } from 'react-redux';
import actions from 'actions';


export default connect (
	({ user }) => ({ user }),
	dispatch => ({
		logout: () => dispatch ( actions.logout() )
	})
)( ProfileModal );
