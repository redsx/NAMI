import React, { Component } from 'react'
import { connect } from 'react-redux'
import immutable from 'immutable'
import PureRender from '../plugins/PureRender.js'
import Header from '../components/Header.jsx'
import Avatar from '../components/Avatar.jsx'
import IconMenu from '../components/IconMenu.jsx'
import language from '../config/language.js'
import stateManage from '../util/stateManage.js'
import { setRightManager } from '../actions/pageUI.js'
import { exitRoom } from '../actions/combin.js'
import AttachButton from './AttachButton.js'

function MessageHeader(props){
    console.log('MessageHeader');
    const { user, room, title, avatar, isPrivate } = props;
    return (
        <Header 
            title = {title}
            leftElement = {<Avatar src = {avatar} size= {40} handleClick = {()=>setRightManager({isShow:true, state: 'profile'})}/>}
            rightElement = {
                <div className = 'Header-leftElement'>
                   { !isPrivate && <i className = 'icon Header-icon' title = {language.search} onClick = {()=>setRightManager({isShow:true, state: 'roomUsers'})}>&#xe601;</i> }
                    <AttachButton />
                    <IconMenu iconButtonElement={<i className = 'icon Header-icon' title = {language.menu}>&#xe612;</i>}>
                        <li className = 'List-item' onClick = {() => setRightManager({isShow: true, state: 'profile'})}>
                                {isPrivate ? language.contactInfo : language.groupInfo}
                        </li >
                        <li className = 'List-item' onClick = {() => exitRoom({room,user})}>
                                {isPrivate ? language.deleteContact : language.exitGroup}
                        </li >
                    </IconMenu>
                </div>
            }
        />
    );
}
export default connect((state) =>{
    const roomInfo = stateManage.getCurRoomInfo(state);
    return {
        title: roomInfo.get('name'),
        avatar: roomInfo.get('avatar'),
        user: state.getIn(['user','_id']),
        room: roomInfo.get('_id'),
        isPrivate: roomInfo.get('isPrivate'),
    }
})(MessageHeader);