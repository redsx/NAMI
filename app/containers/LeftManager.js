import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserProfile from './UserProfile.js'
import ManagerContainer from '../components/ManagerContainer.jsx'
import NewContact from '../components/NewContact.jsx'
import CreateGroup from './CreateGroup.js'
import NotificationSetting from './NotificationSetting.js'
import BlockContact from './BlockContact.js'
import Setting from './Setting.js'

function select(state){
    switch(state){
        case 'createGroup': return <CreateGroup />;
        case 'newContact': return <NewContact />;
        case 'setting': return <Setting />;
        case 'notificationSetting': return <NotificationSetting />;
        case 'blockContact': return <BlockContact />;
        case 'profile':
        default: return <UserProfile />;
    }
}
function renderLeftManager(props){
    const { isShow, state } = props;
    if(isShow) return <div className = 'left-manager'>{select(state)}</div>;
    return null;
}
function LeftManager(props){
    return <ManagerContainer transitionName = 'LeftManager'>{renderLeftManager(props)}</ManagerContainer>
}
export default connect((state) =>({
    isShow: state.getIn(['pageUI','leftManagerState','isShow']),
    state: state.getIn(['pageUI','leftManagerState','state'])
}
))(LeftManager)