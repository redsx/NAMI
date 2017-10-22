import React , {Component} from 'react'
import { connect } from 'react-redux'
import language from '../config/language.js'
import ProfileHeader from './ProfileHeader.jsx'
import { changeRoom } from '../actions/combin.js'
import { setLeftManager } from '../actions/pageUI'
import { socketEmit } from '../actions/common.js'
import FriendListWrap from '../containers/FriendListWrap.js'
import ListItemWrap from '../containers/ListItemWrap.js'
import item from '../util/item.js'
import ListItem from './ListItem.jsx'
function handleClick(){
    // setLeftManager({isShow: false});
    changeRoom(true)(this.props.user._id);
}

const ContactListItem = ListItemWrap(ListItem,item.getUserInfo,handleClick);
const FriendList = FriendListWrap(ContactListItem);

function Friends(props){
    return (
        <div className = 'Profile-container'>
            <ProfileHeader title = {'好友列表'}/>
            <FriendList _id={props._id}/>
        </div>
    );
}

export default connect(state => ({_id: state.getIn(['user','_id'])}))(Friends);