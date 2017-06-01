import React , {Component} from 'react'
import immutable from 'immutable'
import PureRender from '../plugins/PureRender.js'
import Avatar from './Avatar.jsx'
import IconAvatar from './IconAvatar.jsx'
import ChatMeta from './ChatMeta.jsx'
import language from '../config/language.js'

function ListItem(props){
    const { 
        isSelect, 
        Menu, 
        secondary, 
        time, 
        avatar, 
        name, 
        handleClick, 
        icon, 
        marker, 
        avatarStyle,
        unreadCount,
    } = props;
    return ( 
        <li className = 'List-item' onClick = {handleClick}>
            <div className = {isSelect ? 'ActiveListItem ActiveListItem-select' :'ActiveListItem'} >
                {unreadCount > 0 && <div className = 'ActiveListItem-unreadCount'>{unreadCount}</div>}
                <div className = 'ActiveListItem-avatar-container' style = {avatarStyle}>
                    {avatar && <Avatar size = {49} src = {avatar}/>}
                    {icon && <IconAvatar size = {49} unicode = {icon} />}
                </div>
                <div className = 'ActiveListItem-chat-meta'>
                    <ChatMeta 
                        title = {name} 
                        secondary = {secondary} 
                        time = {time}
                        Menu = {Menu}
                        marker = {marker}
                    />
                </div>  
            </div>  
        </li>
    );
}

export default ListItem;
                        