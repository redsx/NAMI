import React, { Component } from 'react'
import { connect } from 'react-redux'
import PureRender from '../plugins/PureRender.js'
import Header from '../components/Header.jsx'
import Avatar from '../components/Avatar.jsx'
import IconMenu from '../components/IconMenu.jsx'
import language from '../config/language.js'
import { setLeftManager } from '../actions/pageUI.js'
import { logout } from '../actions/combin.js'
import { setMenuState } from '../actions/pageUI.js'

function LeftPaneHeader(props){
    const style = {
        background: props.onlineState === 'online' ? 'rgb(53, 195, 40)' : '#f73e0e',
    }
    return (
        <Header 
            leftElement = {
                <div className = 'Header-onlineState-container'>
                    <Avatar 
                        src = {props.avatar} 
                        size= {40}
                        handleClick = {()=>setLeftManager({isShow:true, state: 'profile'})}
                    />
                    <div className = 'Header-onlineState' style = {style}></div>
                 </div>
            }
            rightElement = {
                <div className = 'Header-leftElement'>
                    <i 
                        className = 'icon Header-icon' 
                        title = {language.conversation} 
                        onClick = {()=>setLeftManager({isShow: true, state: 'newContact'})}
                    >&#xe621;</i>
                    <IconMenu iconButtonElement={<i className = 'icon Header-icon'>&#xe612;</i>}>
                        <ul className = 'List'>
                            <li className = 'List-item' onClick = {() => setLeftManager({isShow: true, state: 'createGroup'})}>
                                {language.newGroup}
                            </li >
                            <li className = 'List-item' onClick = {() => setLeftManager({isShow: true, state: 'profile'})}>
                                {language.userProfile}
                            </li >
                            <li className = 'List-item' onClick = {() => setLeftManager({isShow: true, state: 'setting'})}>
                                {language.setting}
                            </li >
                            <li className = 'List-item' onClick = {logout}>
                                {language.logout}
                            </li >
                        </ul>
                    </IconMenu>
                    <i 
                        className = 'icon Header-icon Header-close-btn' 
                        onClick = {() => setMenuState(false)}
                    >&#xe93d;</i>
                </div>
            }
        />
    );
}
export default connect((state) =>({
    avatar: state.getIn(['user', 'avatar']),
    onlineState: state.getIn(['user', 'onlineState'])
}))(PureRender(LeftPaneHeader));