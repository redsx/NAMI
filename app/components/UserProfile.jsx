import React , {Component} from 'react'
import { setLeftManager } from '../actions/pageUI.js'
import PureRender from '../plugins/PureRender.js'
import language from '../config/language.js'
import DelayedAnimation from './DelayedAnimation.jsx'
import Avatar from './Avatar.jsx'
import ContentEditableInput from './ContentEditableInput.jsx'
import ProfileHeader from './ProfileHeader.jsx'
import ProfileSection from './ProfileSection.jsx'
import { changeUserInfo } from '../actions/combin.js'

// react function传递问题
function UserProfile(props){
    const user = props.user;
    return (
        <div className = 'Profile-container'>
            <UserProfileHeader title = {language.userProfile} />
            <div className = 'Profile-body'>
                <UserProfileAvatar 
                    src = {user.get('avatar')} 
                    updateUserInfo = {updateUserInfo} 
                    _id = {user.get('_id')}
                    contentKey = 'avatar'
                />
                <UserProfileInputSectin 
                    title = {language.nickname} 
                    count = {20} 
                    defaultContent = {user.get('nickname')}
                    _id = {user.get('_id')}
                    contentKey = 'nickname'
                />
                <UserProfileTran />
                <UserProfileInputSectin 
                    title = {language.status} 
                    count = {120} 
                    defaultContent = {user.get('status')} 
                    multiLine = {4}
                    _id = {user.get('_id')}
                    contentKey = 'status'
                />
            </div>
        </div>
    );
}
const UserProfileHeader = PureRender(ProfileHeader);

const UserProfileTran = PureRender(function (props){
    return (<div className = 'Profile-transparent'>{language.userProfileTran}</div>);
})

// 暂时只能这样解决关于函数传递的问题，react应该尽量减少函数传递？
const updateUserInfo = (_id,contentKey) => (content) => {
    let info = {};
    info['_id'] = _id;
    info[contentKey] = content;
    return changeUserInfo(info);
}

const UserProfileAvatar = PureRender(function (props){
    const {src,_id,contentKey} = props
    return (
        <div className = 'UserProfile-margin UserProfile-avatar-container'>
            <DelayedAnimation transitionName = 'AvatarScale' delay = {0.2} timeout = {750}>
                <div className = 'Profile-avatar'>
                    <Avatar 
                        size = {200} 
                        src = {props.src} 
                        handleUpload = {updateUserInfo(_id,contentKey)}
                    />
                </div>
            </DelayedAnimation>
        </div>
    );
})
const UserProfileInputSectin = PureRender(function (props){
    const { defaultContent, count, title, multiLine, _id, contentKey } = props;
    return (
        <ProfileSection title = {title} className = 'UserProfile-margin'>
            <ContentEditableInput 
                intEditable = {false}
                defaultContent = {defaultContent || ''}
                count = {count}
                contorllerBtn = {true}
                multiLine = {multiLine}
                handleSubmit = {updateUserInfo(_id,contentKey)}
            />
        </ProfileSection>
    );
})

export default UserProfile;