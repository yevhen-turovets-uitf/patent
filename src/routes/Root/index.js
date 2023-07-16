import Root from './Root';
import { connect } from 'react-redux';


export default connect (
	({ auth }) => ({ auth })
)( Root );
