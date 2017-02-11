import React , {Component} from 'react'
import { setLeftManager } from '../actions/pageUI.js'
import PureRender from '../plugins/PureRender.js'
import language from '../config/language.js'
import DelayedAnimation from './DelayedAnimation.jsx'

function ProfileHeader(props){
    return (
        <header className = 'UserProfile-header'>
            <DelayedAnimation transitionName = 'TextLeftAnima' delay = {0.1}>
            <div className = 'UserProfile-header-title'>
                <span onClick = {()=>setLeftManager({isShow:false})} ><i className = 'icon'>&#xe65a;</i></span>
                <span className = 'UserProfile-header-text'>{props.title}</span>
            </div>
            </DelayedAnimation>
        </header>
    );
}

export default ProfileHeader;