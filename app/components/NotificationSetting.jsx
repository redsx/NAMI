import React , {Component} from 'react'
import { setLeftManager } from '../actions/pageUI.js'
import language from '../config/language.js'
import ProfileHeader from './ProfileHeader.jsx'

function NotificationSetting(props){
    return (
        <div className = 'Profile-container'>
            <ProfileHeader title = {language.notifications} />
            <Checkbox id = 'test' label = '1234'/>
        </div>
    );
}

function Checkbox(props){
    return (
        <div>
            <div className = 'Setting-checkbox-conatienr'>
                <input className = 'Setting-checkbox' type = 'checkbox' id = {props.id}/>
                <div className = 'Setting-checked'><i className = 'icon'>&#xe780;</i></div>
            </div>
            <label htmlFor={props.id} className = 'Setting-checkbox-label noSelect'>{props.label}</label>
        </div>
    );
}
export default NotificationSetting;

