import React, { Component } from 'react'
import { connect } from 'react-redux'
import stateManage from '../util/stateManage.js'
import ContactProfile from './ContactProfile.js'
import RoomProfile from './RoomProfile.js'

function RightManager(props){
    if(props.roomInfo.get('isPrivate')){
        return <ContactProfile curRoom = {props.roomInfo.get('_id')} isBlock = {props.isBlock} _id = {props.user.get('_id')}/>
    } else {
        return <RoomProfile user = {props.user}/>
    }
}
export default connect((state) =>{
    const user = state.get('user');
    const blocks = user.get('blocks');
    const roomInfo = stateManage.getCurRoomInfo(state);
    const isBlock = blocks.includes(roomInfo.get('_id'));
    return {
        user,
        isBlock,
        roomInfo
    }
})(RightManager)