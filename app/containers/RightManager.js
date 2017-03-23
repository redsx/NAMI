import React, { Component } from 'react'
import { connect } from 'react-redux'
import ManagerContainer from '../components/ManagerContainer.jsx'
import RightManagerProfile from './RightManagerProfile.js'
import RoomUsers from './RoomUsers.js'
import Invite from './Invite.js'

function select(state){
    switch(state){
        case 'invite': return <Invite />;
        case 'roomUsers': return <RoomUsers />;
        case 'profile':
        default: return <RightManagerProfile />;
    }
}
function renderRightManager(props){
    const { isShow, state } = props;
    if(isShow){
        return <div className = 'right-manager' key = {state}>{select(state)}</div>
    } else{
        return null;
    };
}
function RightManager(props){
    return <ManagerContainer transitionName = 'RightManager'>{renderRightManager(props)}</ManagerContainer>
}
export default connect((state) =>({
    isShow: state.getIn(['pageUI','rightManagerState','isShow']),
    state: state.getIn(['pageUI','rightManagerState','state'])
}
))(RightManager)
