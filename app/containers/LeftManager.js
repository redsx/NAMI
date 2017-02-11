import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserProfile from './UserProfile.js'
import ManagerContainer from '../components/ManagerContainer.jsx'
import CreateGroup from './CreateGroup.js'

function select(state){
    switch(state){
        case 'createGroup': return <CreateGroup />;
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