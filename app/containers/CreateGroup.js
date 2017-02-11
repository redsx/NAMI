import { connect } from 'react-redux'
import PureRender from '../plugins/PureRender.js'
import CreateGroup from '../components/CreateGroup.jsx'

export default connect(state => ({userId: state.getIn(['user','_id'])}))(PureRender(CreateGroup));