import React, {Component} from 'react'
import Avatar from './Avatar.jsx'
import timeDeal from '../util/time.js'
import config from '../config/config.js'
import { changeRoom } from '../actions/combin.js'
import '../less/Message.less'
 
 
class MessageBox extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        console.log('MessageBox');
        let { children, Menu, content } = this.props;
        let avatar = content.getIn(['owner','avatar']),
            _id = content.getIn(['owner','_id']),
            nickname = content.getIn(['owner','nickname']),
            dir = content.get('dir'),
            isLoading = content.get('isLoading'),
            timestamp = content.get('timestamp');
        let time = timeDeal.getTimeString(timestamp);
        return (
            <div className= 'Message-list-item'>
                <div className = 'Message-container'>
                    <div className = {'avatar-container-'+dir}>
                        <Avatar src = {avatar} handleClick = {() => changeRoom(true)(_id)}/>
                    </div>
                    <div className = 'Message-box' style = {{ textAlign:dir }}>
                        <Nickname nickname = {nickname} time = {time} />
                        <MessageContent dir = {dir} isLoading = {isLoading} Content = {children} Menu = {Menu}/>
                    </div>
                </div>
            </div>
        );
    }
}
// 不可复用组件
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
    console.log('MessageContent');
    return (
        <div className = 'Message-content'>
            {Content}
            <Triangle dir = {dir}/>
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
 
export default MessageBox;