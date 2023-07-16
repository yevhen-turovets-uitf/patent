import Profile from './Profile';
import { connect } from 'react-redux';


export default connect (
	({ user }) => ({ user })
)( Profile );
