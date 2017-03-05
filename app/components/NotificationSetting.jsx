import React , {Component} from 'react'
import { setLeftManager } from '../actions/pageUI.js'
import language from '../config/language.js'

function NotificationSetting(props){
    return (
        <div className = 'Profile-container'>
            <ProfileHeader title = {language.notifications} />
        </div>
    );
}

export default NotificationSetting;

