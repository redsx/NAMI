import React, { Component } from 'react'
import { connect } from 'react-redux'
import PureRender from '../plugins/PureRender.js'
import Header from '../components/Header.jsx'
import Avatar from '../components/Avatar.jsx'
import IconMenu from '../components/IconMenu.jsx'
import language from '../config/language.js'
import { setLeftManager } from '../actions/pageUI.js'
import { logout } from '../actions/combin.js'

function LeftPaneHeader(props){
    console.log('LeftPaneHeader');
    return (
        <Header 
            leftElement = {<Avatar src = {props.avatar} size= {40} handleClick = {()=>setLeftManager({isShow:true, state: 'profile'})}/>}
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
                            <li className = 'List-item' onClick = {logout}>
                                {language.logout}
                            </li >
                        </ul>
                    </IconMenu>
                </div>
            }
        />
    );
}
export default connect((state) =>({avatar: state.getIn(['user','avatar'])}))(PureRender(LeftPaneHeader));