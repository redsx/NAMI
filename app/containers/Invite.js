import React, { Component } from 'react'
import immutable from 'immutable'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'
import { shouldComponentUpdate } from '../plugins/PureRender.js'
import { pushSnackbar } from '../actions/pageUI.js'
import { getInviteLink, refreshInviteLink } from '../actions/activeList.js'
import handleClipboard from '../util/clipboard.js'
import socketConfig from '../config/socketConfig.js'
import Invite from '../components/Invite.jsx'

window.handleClipboard = handleClipboard;

const InviteWarp = (WrappedComponent) => class extends Component{
    constructor(props){
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
        this.state = {isLoading: true, room: immutable.fromJS({})};
    }
    connectLink(link){
        return 'http://'+ socketConfig.production.HOST + '/' + link;
    }
    @autobind
    handleGetInviteLink(){
        getInviteLink({_id: this.props.curRoom})
        .then((ret) => {
            ret.link = ret.inviteLink ? this.connectLink(ret.inviteLink) : '没有生成邀请链接';
            this.isMount && this.setState({room: immutable.fromJS(ret)});
        })
    }
    @autobind
    handleRefreshLink(){
        const { curRoom, user } = this.props;
        refreshInviteLink({_id: curRoom, creater: user})
        .then((ret) => {
            pushSnackbar('更新房间邀请链接');
            let room = this.state.room.set('inviteLink',ret.inviteLink);
            room = room.set('link',this.connectLink(ret.inviteLink));
            this.isMount && this.setState({room: room});
        })
        .catch((err) => pushSnackbar('权限不足'))
    }
    @autobind
    handleCopyLink(){
        handleClipboard.setClipboardValue(this.state.room.get('link'));
        const success = handleClipboard.clipboard();
        if(success) return pushSnackbar('成功复制链接到剪贴板');
        return pushSnackbar('复制链接到剪贴板失败');
    }
    componentDidMount(){
        this.isMount = true;
        const _id = this.props.curRoom;
        this.handleGetInviteLink();
    }
    componentWillUnmount(){
        this.isMount = false;
    }
    render(){
        const newProps = {
            handleCopyLink: this.handleCopyLink,
            handleRefreshLink: this.handleRefreshLink,
        }
        return <WrappedComponent  {...this.state} {...newProps}/>
    }
}

export default connect((state) =>({
    curRoom: state.getIn(['user','curRoom']),
    user: state.getIn(['user','_id']),
}
))(InviteWarp(Invite))