import { connect } from 'react-redux'
import NotificationSetting from '../components/NotificationSetting.jsx'

export default connect((state) => {
    return {
        _id: state.getIn(['user','_id']),
        blockAll: state.getIn(['user','blockAll']),
        notifications: state.getIn(['pageUI','notifications'])
    }
})(NotificationSetting);