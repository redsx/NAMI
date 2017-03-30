import React , {Component} from 'react'
import { setLeftManager } from '../actions/pageUI.js'
import language from '../config/language.js'
import ProfileHeader from './ProfileHeader.jsx'

function BlockSetting(props){
    const notifications = props.notifications.toJS();
    return (
        <div className = 'Profile-container'>
            <ProfileHeader title = {language.blockContact} />
            <div className = 'BlockSetting-grup'>
                BlockSetting
            </div>
        </div>
    );
}
export default BlockSetting;

