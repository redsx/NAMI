import { connect } from 'react-redux'
import PureRender from '../plugins/PureRender.js'
import PokeballLoaing from '../components/PokeballLoaing.jsx'

export default connect(state => ({
    loadingState:state.getIn(['pageUI','loadingState'])
}))(PureRender(PokeballLoaing));