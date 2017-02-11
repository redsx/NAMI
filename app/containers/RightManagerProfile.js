import React, { Component } from 'react'
import { connect } from 'react-redux'
import stateManage from '../util/stateManage.js'
import ContactProfile from './ContactProfile.js'
import RoomProfile from './RoomProfile.js'

function RightManager(props){
    if(props.roomInfo.get('isPrivate')){
        return <ContactProfile curRoom = {props.roomInfo.get('_id')} />
    } else {
        return <RoomProfile user = {props.user}/>
    }
}
export default connect((state) =>({
    user: state.get('user'),
    roomInfo: stateManage.getCurRoomInfo(state)
}
))(RightManager)