import React , {Component} from 'react'
import immutable from 'immutable'
import language from '../config/language.js'
import { setRightManager } from '../actions/pageUI.js'
import Avatar from './Avatar.jsx'
import Header from './Header.jsx'
import ContentEditableInput from './ContentEditableInput.jsx'
import ListItem from './ListItem.jsx'
import timedeal from '../util/time.js'
import Loading from './Loading.jsx'
import DelayedAnimation from './DelayedAnimation.jsx'
import ProfileSection from './ProfileSection.jsx'
import ProfileButton from './ProfileButton.jsx'
import '../less/Invite.less'

function Invite(props){
    const { isLoading, room, handleCopyLink, handleRefreshLink, handleOpenModal } = props;
    return (
            <div className = 'Profile-container'>
                <Header 
                    title = {language.inviteTitle}
                    leftElement = {<i className = 'icon' onClick = {()=>setRightManager({isShow:true,state: 'profile'})}>&#xe611;</i>}
                />
                <div className = 'Profile-body'>

                    <ProfileSection className = 'Invite-Section'>
                        <Avatar size = {82} src = {room.get('avatar')}/>
                        <div className = 'Invite-link-container'>
                            <p>{room.get('name')}</p>
                            <p className = 'Invite-link'>{room.get('link')}</p>
                        </div>
                    </ProfileSection>

                    <div className = 'Profile-transparent'>{language.linkTran}</div>

                    <div className = 'UserProfile-margin'>
                        <ProfileButton text = {language.sendInviteLinkByNami} unicode = '&#xe61b;' color = '#888' handleClick = {handleOpenModal}/>
                        <ProfileButton text = {language.copyLink} unicode = '&#xe650;' handleClick = {handleCopyLink} color = '#888'/>
                        <ProfileButton text = {language.refreshLink} unicode = '&#xe751;' handleClick = {handleRefreshLink} color = '#888' />
                    </div>
                </div>  
            </div>
    );
}

export default Invite;