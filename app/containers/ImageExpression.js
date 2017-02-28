import { connect } from 'react-redux'
import stateManage from '../util/stateManage.js'
import ImageExpression from '../components/ImageExpression.jsx'

export default connect(state => {
    const isPrivate = !!stateManage.getCurRoomInfo(state).get('isPrivate');
    return {
        isPrivate,
        user:state.get('user'),
    }
})(ImageExpression);