import { connect } from 'react-redux'
import RoomUsers from '../components/RoomUsers.jsx'

export default connect(state => ({room:state.getIn(['user','curRoom'])}))(RoomUsers);