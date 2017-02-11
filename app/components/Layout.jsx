import React , {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import ManagerContainer from './ManagerContainer.jsx'
import PokeballLoading from '../containers/PokeballLoaing.js'
import MessageContainer from '../containers/MessageContainer.js'
import InputArea from './InputArea.jsx'
import Header from './Header.jsx'
import LeftPaneHeader from '../containers/LeftPaneHeader.js'
import MessageHeader from '../containers/MessageHeader.js'
import ActiveList from '../containers/ActiveList.js'

import '../less/Layout.less'

import ContentEditableInput from './ContentEditableInput.jsx'
import UserProfile from '../containers/UserProfile.js'
import RoomProfile from '../containers/RoomProfile.js'
import ContactProfile from '../containers/ContactProfile.js'
import RightManagerProfile from '../containers/RightManagerProfile.js'
import LeftManager from '../containers/LeftManager.js'
import RightManager from '../containers/RightManager.js'

function Layout(props){
    return (
        <div className = 'Layout-wrapper'>
            {props.children}
            <PokeballLoading />
            <div className = 'Layout-container'>
                <div className = 'manager-container'>
                    <span className = 'manager-one '> <LeftManager /> </span>
                    <span className = 'manager-two '></span>
                    <span className = 'manager-three '> <RightManager /></span>
                </div>
                <span className = 'pane-one'>
                    <LeftPaneHeader />
                    <ActiveList />
                </span>
                <span className = {props.showRightManager?'pane-three chat-area':'pane-two chat-area'}>
                    <MessageHeader />
                    <MessageContainer />
                    <InputArea />
                </span>
            </div>
        </div>
    );
}

export default Layout;