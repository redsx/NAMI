import React, {Component} from 'react'
import Avatar from './Avatar.jsx'
import timeDeal from '../util/time.js'
import config from '../config/config.js'
import PureRender from '../plugins/PureRender.js'
import { changeRoom, revokeMessage } from '../actions/combin.js'
import language from '../config/language.js'
import IconMenu from './IconMenu.jsx'
import '../less/Message.less'
 
 
class MessageBox extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const { children, content } = this.props;
        const avatar = content.getIn(['owner','avatar']),
            ownerId = content.getIn(['owner','_id']),
            nickname = content.getIn(['owner','nickname']),
            _id = content.get('_id'),
            Tid = content.get('Tid'),
            dir = content.get('dir'),
            isPrivate = content.get('isPrivate'),
            isLoading = content.get('isLoading'),
            timestamp = content.get('timestamp');
        const time = timeDeal.getTimeString(timestamp);
        const menuProps = {isPrivate, _id, Tid, ownerId, dir}
        return (
            <div className= 'Message-list-item'>
                <div className = 'Message-container'>
                    <div className = {'avatar-container-'+dir}>
                        <Avatar src = {avatar}/>
                    </div>
                    <div className = 'Message-box' style = {{ textAlign:dir }}>
                        <PureNickname nickname = {nickname} time = {time} />
                        <MessageContent 
                            dir = {dir} 
                            isLoading = {isLoading} 
                            Content = {children} 
                            Menu = {<Menu {...menuProps}/>}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
// 不可复用组件
const PureTriangle = PureRender(Triangle),
    PureNickname = PureRender(Nickname);

function Triangle(props){
    return (
        <span>
            <div className = {'triangle-'+props.dir+'-outer'}></div>
            <div className = {'triangle-'+props.dir+'-inner'}></div>
        </span>
    );
}
function Nickname(props){
    return (
        <span className = 'Message-nickname-box'>
            <span className = 'Message-nickname'>{props.nickname}</span>
            <span className = 'Message-time'>{props.time}</span>
        </span>
    );
}
function MessageContent(props){
    let { Content, dir, Menu, isLoading } = props;
    return (
        <div className = 'Message-content'>
            {Content}
            <PureTriangle dir = {dir}/>
            {
                isLoading?
                <div className = {'Message-loading-'+dir}>
                    <img className = 'Message-loading-image' src = {config.LoadingImage} />
                </div>
                :<div className = {'Message-handle-'+dir}>{Menu}</div>
            }
        </div>
    );
}
// 菜单
function Menu(props){
    const { _id, isPrivate, ownerId, dir, Tid } = props;
    let list = [];
    if(dir === 'right'){
        list.push(
            <li 
                className = 'List-item'
                key = {`${_id}-3`}
                onClick = {() => revokeMessage({_id,Tid,ownerId,isPrivate})}
            >
                {language.withdrawn}
            </li >
        );
    }
    return (
        <IconMenu iconButtonElement={<i className = 'icon'>&#xe71c;</i>}>
            <ul className = 'List'>
                <li 
                    className = 'List-item' 
                    key = {`${_id}-1`}
                    onClick = {() => changeRoom(true)(ownerId)}
                >
                    {language.sendMessage}
                </li >
                {list}
            </ul>
        </IconMenu>
    );
}


export default MessageBox;