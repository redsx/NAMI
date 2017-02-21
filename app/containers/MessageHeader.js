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
import AttachButton from '../components/AttachButton.jsx'

const src = 'http://oajmk96un.bkt.clouddn.com/lolo.jpg';

function MessageHeader(props){
    console.log('MessageHeader');
    return (
        <Header 
            title = {props.title}
            leftElement = {<Avatar src = {props.avatar} size= {40} handleClick = {()=>setRightManager({isShow:true, state: 'profile'})}/>}
            rightElement = {
                <div className = 'Header-leftElement'>
                    <i className = 'icon Header-icon' title = {language.search} onClick = {()=>setRightManager({isShow:true, state: 'roomUsers'})}>&#xe601;</i>
                    <AttachButton />
                    <IconMenu iconButtonElement={<i className = 'icon Header-icon' title = {language.menu}>&#xe612;</i>} />
                </div>
            }
        />
    );
}
export default connect((state) =>{
    const roomInfo = stateManage.getCurRoomInfo(state);
    return {
        title: roomInfo.get('name'),
        avatar: roomInfo.get('avatar')
    }
})(MessageHeader);