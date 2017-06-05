import React, { Component } from 'react'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'
import { shouldComponentUpdate } from '../plugins/PureRender.js'
import InputContent from '../components/InputContent.jsx'
import { sendMessage, sendFile } from '../actions/combin.js'
import language from '../config/language.js'
import uploadHandle from '../util/upload.js'
import stateManage from '../util/stateManage'
import message from '../util/message.js'
import { createRoom, mergeUserInfo } from '../actions/user.js'


const InputContentWarp = (WrappedComponent) => class extends Component{
    constructor(props){
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    }
    @autobind
    handleSend(content,type = 'text'){
        const user = this.props.user.toJS();
        const isPrivate = this.props.isPrivate;
        const msg =  message.createMessage(user,content,isPrivate,type);
        if(msg) sendMessage(isPrivate)(msg.message,msg.preMessage);
    }
    @autobind
    handlePaste(e){
        const items = e.clipboardData.items,
            isPrivate = this.props.isPrivate,
            user = this.props.user.toJS();
        if(e.clipboardData.types.indexOf('Files') !== -1) {
            e.preventDefault();
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                if( item && item.kind === 'file' && item.type.match(/^image\/\w+/)){
                    const imageHandle = uploadHandle(item.getAsFile());
                    const msg =  message.createMessage(user,'content',isPrivate,'image');
                    sendFile(isPrivate)(msg,imageHandle);
                }
            }
        }
    }
    render(){
        let newProps = {
            handlePaste: this.handlePaste,
            handleSend: this.handleSend,
            createRoom: this.createRoom
        }
        return <WrappedComponent {...this.props} {...newProps}/>
    }
}

export default connect(state => {
    const roomInfo = stateManage.getCurRoomInfo(state);
    const isPrivate = !!roomInfo.get('isPrivate');
    const user = state.get('user');
    const blocks = user.get('blocks');
    const isBlock = blocks.includes(roomInfo.get('_id'));
    return {
        isPrivate,
        user,
        isBlock,
        isSupportRecorder: state.getIn(['pageUI','isSupportRecorder']),
        showExpressions: state.getIn(['pageUI','notifications', 'showExpressions'])
    }
})(InputContentWarp(InputContent));