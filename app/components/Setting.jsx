import React , {Component} from 'react'
import { setLeftManager } from '../actions/pageUI.js'
import { socketEmit } from '../actions/common.js'
import { changeRoom, errPrint } from '../actions/combin.js'
import language from '../config/language.js'
import Avatar from './Avatar.jsx'
import ProfileHeader from './ProfileHeader.jsx'
import ProfileButton from './ProfileButton.jsx'
import ProfileSection from './ProfileSection.jsx'
import '../less/Setting.less'

function getHelp(){
    socketEmit('getAdminId')()
    .then(ret => {
        setLeftManager({isShow: false})
        changeRoom(true)(ret._id)
    })
    .catch(err => errPrint(err))
}

function Setting(props){
    return (
        <div className = 'Profile-container'>
            <ProfileHeader title = {language.setting} />
            <ProfileSection className = 'Invite-Section'>
                <Avatar size = {82} src = {props.avatar}/>
                <div className = 'Invite-link-container'>
                    <p>{props.nickname}</p>
                </div>
            </ProfileSection>
            <ProfileButton text = {language.notifications} unicode = '&#xe844;' color = '#888' handleClick = {()=>setLeftManager({isShow: true,state: 'notificationSetting'})}/>
            <ProfileButton text = {language.blockContact} unicode = '&#xe618;' color = '#888' handleClick = {()=>setLeftManager({isShow: true,state: 'blockContact'})}/>
            <ProfileButton text = {language.help} unicode = '&#xe614;' color = '#888' handleClick = {() => getHelp()}/>
        </div>
    );
}

export default Setting;