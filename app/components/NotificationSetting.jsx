import React , {Component} from 'react'
import { setLeftManager } from '../actions/pageUI.js'
import language from '../config/language.js'
import ProfileHeader from './ProfileHeader.jsx'
import { setNotificationState } from '../actions/pageUI.js'
import { changeUserInfo } from '../actions/combin.js'

function setNotification(key){
    return function(val){
        let payload = {};
        payload[key] = val;
        setNotificationState(payload);
    }
}
function disabledPrivate(payload){
    return function(val){
        payload.blockAll = val;
        changeUserInfo(payload);
    }
}
function NotificationSetting(props){
    const notifications = props.notifications.toJS();
    return (
        <div className = 'Profile-container'>
            <ProfileHeader title = {language.notifications} />
            <div className = 'NotificationSetting-checkbox-group'>
                {
                    Object.keys(notifications).map((key) => {
                        return <Checkbox 
                            id = {`notifications-${key}`}
                            key = {`notifications-${key}`}
                            label = {language[key]} 
                            checked = {notifications[key]}
                            handleChange = {setNotification(key)}
                        />
                    })
                }
                <Checkbox 
                    id = {`notifications-${language.disabledPrivate}`}
                    key = {`notifications-${language.disabledPrivate}`}
                    label = {language.disabledPrivate} 
                    checked = {props.blockAll}
                    handleChange = {disabledPrivate({_id: props._id})}
                />
            </div>
        </div>
    );
}

function Checkbox(props){
    const { id, label, checked, handleChange } = props;
    return (
        <div className = 'Setting-checkbox-conatienr'>
            <div className = 'Setting-checkbox-content'>
                <input 
                    className = 'Setting-checkbox' 
                    type = 'checkbox' 
                    id = {id} 
                    defaultChecked = {checked} 
                    onChange = {e => handleChange(e.target.checked)}
                />
                <div className = 'Setting-checked'><i className = 'icon'>&#xe780;</i></div>
            </div>
            <label htmlFor={id} className = 'Setting-checkbox-label noSelect'>{label}</label>
        </div>
    );
}
export default NotificationSetting;

