import React , {Component} from 'react'
import { setLeftManager } from '../actions/pageUI.js'
import language from '../config/language.js'
import DelayedAnimation from './DelayedAnimation.jsx'
import Avatar from './Avatar.jsx'
import ContentEditableInput from './ContentEditableInput.jsx'
import ProfileHeader from './ProfileHeader.jsx'
import config from '../config/config.js'
import { createGroup } from '../actions/combin.js'

function create(id){
    return (roomName) => createGroup({user: id,roomName});
}
function CreateGroup(props){
    const userId = props.userId;
    const handleSubmit = create(userId);
    return (
        <div className = 'Profile-container'>
            <ProfileHeader title = {language.newGroup} />
            <div className = 'Profile-body'>
                <div className = 'UserProfile-margin UserProfile-avatar-container'>
                    <DelayedAnimation transitionName = 'AvatarScale' delay = {0.2} timeout = {750}>
                        <div className = 'Profile-avatar'>
                            <Avatar size = {200} src = {config.defaultGroupAvatar}/>
                        </div>
                    </DelayedAnimation>
                </div>
                <div className = 'CreateGroupProfile-edit'>
                    <ContentEditableInput 
                        intEditable = {true}
                        defaultContent = ''
                        count = {20}
                        contorllerBtn = {true}
                        handleSubmit = {handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
}

export default CreateGroup;