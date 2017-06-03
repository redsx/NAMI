import { connect } from 'react-redux'
import immutable from 'immutable'
import PureRender from '../plugins/PureRender.js'
import MessageContainer from '../components/MessageContainer.jsx'

export default connect((state) =>{
    const room = state.getIn(['user','curRoom']),
          user = state.get('user');
    const roomInfo = state.getIn(['activeList',room]) || immutable.fromJS({}),
          messagesObj = state.get('messages') || immutable.fromJS({}),
          showExpression = state.getIn(['pageUI','expressionState']),
          showImage = state.getIn(['pageUI','notifications','showImages']),
          owlState = state.getIn(['pageUI', 'owlState']),
          msgContainerScroll = state.getIn(['pageUI','msgContainerScroll']) || immutable.fromJS({});
    return { roomInfo, messagesObj, user , msgContainerScroll, showExpression, showImage, owlState};
})(PureRender(MessageContainer))
