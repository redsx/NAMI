import { connect } from 'react-redux'
import PureRender from '../plugins/PureRender.js'
import Snackbar from '../components/Snackbar.jsx'

export default connect(state => ({snackbars:state.getIn(['pageUI','snackbars'])}))(PureRender(Snackbar));