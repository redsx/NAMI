import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserProfile from './UserProfile.js'
import ManagerContainer from '../components/ManagerContainer.jsx'
import NewContact from '../components/NewContact.jsx'
import CreateGroup from './CreateGroup.js'

import Setting from '../components/Setting.jsx'
import NotificationSetting from '../components/NotificationSetting.jsx'
function select(state){
    switch(state){
        case 'createGroup': return <CreateGroup />;
        case 'newContact': return <NewContact />;
        case 'setting': return <NotificationSetting />;
        case 'notificationSetting': return <NotificationSetting />;
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