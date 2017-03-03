import React , {Component} from 'react'
import immutable from 'immutable'
import language from '../config/language.js'
import { setRightManager } from '../actions/pageUI.js'
import Avatar from './Avatar.jsx'
import Header from './Header.jsx'
import ContentEditableInput from './ContentEditableInput.jsx'
import ListItem from './ListItem.jsx'
import DelayedAnimation from './DelayedAnimation.jsx'
import Loading from './Loading.jsx'
import timedeal from '../util/time.js'
import ProfileSection from './ProfileSection.jsx'
import ProfileButton from './ProfileButton.jsx'

function ContactProfile(props){
    const { avatar, status, lastOnlineTime, nickname, isLoading } = props;
    return (
            <div className = 'Profile-container'>
                <Header 
                    title = {language.contactInfo}
                    leftElement = {<i className = 'icon' onClick = {()=>setRightManager({isShow:false})}>&#xe604;</i>}
                />
                {
                    isLoading ?
                    < Loading/>
                    :<div className = 'Profile-body'>
                        <ProfileSection>
                            <div className = 'Profile-avatar'>
                                <DelayedAnimation transitionName = 'AvatarScale' delay = {0.2} timeout = {750}>
                                    <Avatar size = {200} src = {avatar}/>
                                </DelayedAnimation>
                            </div>
                            <div className = 'RoomProfile-info'>
                                <p className = 'Profile-info-title'>{nickname}</p>
                                <p>{'last seen '+ timedeal.getYDHString(lastOnlineTime)}</p>
                            </div>
                        </ProfileSection>
                        
                        <ProfileSection className = 'RoomProfile-margin' title = {language.status} content = {status || '...'}/>
                        
                        <ProfileButton className = 'RoomProfile-margin' color = '#635f5f' unicode = '&#xe794;' text = {language.blockContact}/>
                        <ProfileButton className = 'RoomProfile-margin' color = '#D70000' unicode = '&#xe607;' text = {language.deleteContact}/>
                       
                    </div>  
                }
            </div>
    );
}

export default ContactProfile;