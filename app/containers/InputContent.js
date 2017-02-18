import React, { Component } from 'react'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'
import { shouldComponentUpdate } from '../plugins/PureRender.js'
import InputContent from '../components/InputContent.jsx'
import { sendMessage } from '../actions/combin.js'
import language from '../config/language.js'
import uploadHanle from '../util/upload.js'
import stateManage from '../util/stateManage'
import message from '../util/message.js'
import { createRoom, mergeUserInfo } from '../actions/user.js'


const InputContentWarp = (WrappedComponent) => class extends Component{
    constructor(props){
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    }
    @autobind
    createRoom(roomName){
        let id = this.props.user.get('_id');
        // createRoom({id,roomName})
        // .then(ret => console.log(ret))
        // mergeUserInfo({curRoom: roomName});
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
        let items = e.clipboardData.items;
        if(e.clipboardData.types.indexOf('Files') !== -1) {
            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                if( item && item.kind === 'file' && item.type.match(/^image\/\w+/)){
                    let imageHandle = uploadHanle(item.getAsFile());
                    imageHandle.upload()
                    .then(ret => this.handleSend(ret.src,'image'))
                    .catch((err) => pushSnackbar(language[err]||language['ERROR1009']))
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
    const isPrivate = !!stateManage.getCurRoomInfo(state).get('isPrivate');
    return {
        isPrivate,
        user:state.get('user'),
        isSupportRecorder: state.getIn(['pageUI','isSupportRecorder'])
    }
})(InputContentWarp(InputContent));