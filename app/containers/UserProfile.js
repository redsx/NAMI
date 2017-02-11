import { connect } from 'react-redux'
import PureRender from '../plugins/PureRender.js'
import UserProfile from '../components/UserProfile.jsx'

export default connect((state) =>{
    return {
        user: state.get('user'),
    }
})(PureRender(UserProfile))