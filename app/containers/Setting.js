import { connect } from 'react-redux'
import PureRender from '../plugins/PureRender.js'
import Setting from '../components/Setting.jsx'

export default connect(state => ({
    avatar: state.getIn(['user','avatar']),
    nickname: state.getIn(['user','nickname']),
}))(Setting);