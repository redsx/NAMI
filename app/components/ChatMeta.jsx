import React , {Component} from 'react'
import PureRender from '../plugins/PureRender.js'
import '../less/ChatMeta.less'

function ChatMeta(props){
    let { title, secondary, time, marker, Menu } = props;
    return (
        <div className = 'ChatMeta'>
            <div className = 'ChatMeta-main'>
                <span className = 'ChatMeta-title'>{title}</span>
                <span className = {marker?'ChatMeta-marker':'ChatMeta-time'}>{ marker || time }</span>
            </div>
            <div className = 'ChatMeta-secondary'>
                <span className = 'ChatMeta-secondary-text'>{secondary}</span>
                <span className = 'ChatMeta-menu-btn'>{ Menu }</span>
            </div>
        </div>
    );
}

export default PureRender(ChatMeta);