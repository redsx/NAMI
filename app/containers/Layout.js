import { connect } from 'react-redux'
import PureRender from '../plugins/PureRender.js'
import Layout from '../components/Layout.jsx'

export default connect(state => ({
    showRightManager:state.getIn(['pageUI','rightManagerState','isShow']),
    curRoom: state.getIn(['user','curRoom']),
    showExpression: state.getIn(['pageUI','expressionState']),
    menuState: state.getIn(['pageUI', 'menuState']),
}))(PureRender(Layout));