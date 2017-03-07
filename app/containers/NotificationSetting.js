import { connect } from 'react-redux'
import NotificationSetting from '../components/NotificationSetting.jsx'

export default connect(state => ({notifications: state.getIn(['pageUI','notifications'])}))(NotificationSetting);