import { connect } from 'react-redux'
import stateManage from '../util/stateManage.js'
import AttachButton from '../components/AttachButton.jsx'

export default connect(state => ({
    isPrivate: !!stateManage.getCurRoomInfo(state).get('isPrivate'),
    user: state.get('user'),
}))(AttachButton);