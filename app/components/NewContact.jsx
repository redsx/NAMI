import React , {Component} from 'react'
import language from '../config/language.js'
import ProfileHeader from './ProfileHeader.jsx'
import { changeRoom } from '../actions/combin.js'
import { setLeftManager } from '../actions/pageUI'
import { socketEmit } from '../actions/common.js'
import ContactListWrap from '../containers/ContactListWrap.js'
import ListItemWrap from '../containers/ListItemWrap.js'
import item from '../util/item.js'
import ListItem from './ListItem.jsx'
function handleClick(){
    setLeftManager({isShow: false});
    changeRoom(true)(this.props.user._id);
}
function handleSearch(nickname = '',onlineState){
    this.setState({isLoading: true});
    return socketEmit('getUsersList')({nickname,onlineState})
        .then(ret=>this.setState({users: ret,isLoading: false}))
}
const ContactListItem = ListItemWrap(ListItem,item.getUserInfo,handleClick);
const ContactList = ContactListWrap(ContactListItem,handleSearch);

function NewContact(props){
    return (
        <div className = 'Profile-container'>
            <ProfileHeader title = {language.newContact}/>
            <ContactList />
        </div>
    );
}

export default NewContact;