import { connect } from 'react-redux'
import PureRender from '../plugins/PureRender.js'
import Layout from '../components/Layout.jsx'

export default connect(state => ({
    showRightManager:state.getIn(['pageUI','rightManagerState','isShow'])
}))(PureRender(Layout));