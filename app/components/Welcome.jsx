import React , {Component} from 'react'
import '../less/Welcome.less'

function Welcome(props){
    return (
        <div className = 'Welcome displayFlex'>
            <div className = 'Welcome-container'>
                <div className = 'Welcome-image'></div>
                <div className = 'Welcome-text'>Hi~ 选择房间开始聊天吧^_^</div>
            </div>
        </div>
    );
}

export default Welcome;