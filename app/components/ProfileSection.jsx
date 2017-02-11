import React , {Component} from 'react'
import { setLeftManager } from '../actions/pageUI.js'
import PureRender from '../plugins/PureRender.js'
import language from '../config/language.js'
import DelayedAnimation from './DelayedAnimation.jsx'

function ProfileSection(props){
    const { className, children, content, title, titleClass } = props;
    return (
        <div className = {'Profile-section ' + className}>
            {title && <div className = {'Profile-section-title ' + titleClass}>{title}</div>}
            {content && <p>{content}</p>}
            {children}
        </div>
    );
}

export default ProfileSection;