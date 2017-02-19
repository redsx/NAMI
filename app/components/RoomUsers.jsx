import React , {Component} from 'react'
import language from '../config/language.js'
import ProfileHeader from './ProfileHeader.jsx'
import { changeRoom } from '../actions/combin.js'
import { setRightManager } from '../actions/pageUI'
import ContactListWrap from '../containers/ContactListWrap.js'
import ListItemWrap from '../containers/ListItemWrap.js'
import item from '../util/item.js'
import ListItem from './ListItem.jsx'
import { socketEmit } from '../actions/common.js'
import Header from './Header.jsx'

function handleClick(){
    setRightManager({isShow: false});
    changeRoom(true)(this.props.user._id);
}
function handleSearch(room){
    return function(nickname='',onlineState,){
        this.setState({isLoading: true});
        return socketEmit('getRoomUsers')({nickname,onlineState,room})
            .then(ret=>this.setState({users: ret,isLoading: false}))
    }
}
const ContactListItem = ListItemWrap(ListItem,item.getUserInfo,handleClick);

function RoomUsers(props){
    const ContactList = ContactListWrap(ContactListItem,handleSearch(props.room));
    return (
        <div className = 'Profile-container'>
            <Header 
                title = {language.participants}
                leftElement = {<i className = 'icon' onClick = {()=>setRightManager({isShow:false})}>&#xe604;</i>}
            />
            <ContactList />
        </div>
    );
}

export default RoomUsers;