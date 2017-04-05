import React, { Component } from 'react'
import immutable from 'immutable'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'
import { shouldComponentUpdate } from '../plugins/PureRender.js'
import { pushSnackbar } from '../actions/pageUI.js'
import { getInviteLink, refreshInviteLink } from '../actions/activeList.js'
import handleClipboard from '../util/clipboard.js'
import config from '../config/config'
import Invite from '../components/Invite.jsx'
import Modal from '../components/Modal.jsx'
import language from '../config/language.js'

import item from '../util/item.js'
import ActiveListWrap from './ActiveListWrap.js'
import ListItemWrap from './ListItemWrap.js'
import ListItem from '../components/ListItem.jsx'
import message from '../util/message.js'



window.handleClipboard = handleClipboard;

const InviteWarp = (WrappedComponent) => class extends Component{
    constructor(props){
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
        this.state = {modalState: false, isLoading: true, room: immutable.fromJS({})};
    }
    connectLink(link){
        return config.inviteLink + link;
    }
    @autobind
    handleOpenModal(){
        this.setState({modalState: true});
    }
    @autobind
    handlecloseModal(){
        this.setState({modalState: false});
    }
    @autobind
    handleGetInviteLink(){
        getInviteLink({_id: this.props.user.get('curRoom')})
        .then((ret) => {
            ret.link = ret.inviteLink ? this.connectLink(ret.inviteLink) : '...';
            this.isMount && this.setState({room: immutable.fromJS(ret)});
        })
    }
    @autobind
    handleRefreshLink(){
        const curRoom = this.props.user.get('curRoom');
        const user = this.props.user.get('_id');
        refreshInviteLink({_id: curRoom, creater: user})
        .then((ret) => {
            pushSnackbar(language.refreshLink);
            let room = this.state.room.set('inviteLink',ret.inviteLink);
            room = room.set('link',this.connectLink(ret.inviteLink));
            this.isMount && this.setState({room: room});
        })
        .catch((err) => pushSnackbar(language.ERROR10013))
    }
    @autobind
    handleCopyLink(){
        handleClipboard.setClipboardValue(this.state.room.get('link'));
        const success = handleClipboard.clipboard();
        if(success) return pushSnackbar(language.copiedLink);
        return pushSnackbar(language.copyError);
    }
    
    componentDidMount(){
        this.isMount = true;
        this.handleGetInviteLink();
    }
    componentWillUnmount(){
        this.isMount = false;
    }
    render(){
        const newProps = {
            handleCopyLink: this.handleCopyLink,
            handleRefreshLink: this.handleRefreshLink,
            handleOpenModal: this.handleOpenModal,
        }
        const handleClick = message.redirectMessage(this.props.user.toJS(),this.state.room.get('link'),'text',this.handlecloseModal);
        const ActiveListItem = ListItemWrap(ListItem,item.getItemInfo,handleClick);
        const ActiveList = ActiveListWrap(ActiveListItem);
        return (
            <div>
                <WrappedComponent  {...this.state} {...newProps}/>
                <Modal 
                    open = {this.state.modalState} 
                    handleClose = {this.handlecloseModal}
                    title = {language.sendInviteLink}
                >
                    <ActiveList />
                </Modal>
            </div>
        );
    }
}

export default connect((state) =>({
    user: state.get('user'),
}
))(InviteWarp(Invite))