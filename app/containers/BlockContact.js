import React , {Component} from 'react'
import { connect } from 'react-redux'
import language from '../config/language.js'
import ProfileHeader from '../components/ProfileHeader.jsx'
import ListItem from '../components/ListItem.jsx'
import { removeBlock } from '../actions/combin'
import BlockListWrap from './BlockListWrap.js'
import ListItemWrap from './ListItemWrap.js'
import item from '../util/item.js'

function handleClick(){
    removeBlock({
        blockId: this.props.user._id,
        _id: this.props._id
    });
}
const BlockListItem = ListItemWrap(ListItem,item.getUserInfo,handleClick);
const BlockList = BlockListWrap(BlockListItem);

function BlockContact(props){
    return (
        <div className = 'Profile-container'>
            <ProfileHeader title = {language.blockContact}/>
            <BlockList {...props} />
        </div>
    );
}

export default connect(((state) => {
    return {
        _id: state.getIn(['user','_id']),
        blocks: state.getIn(['user','blocks']),
    }
}))(BlockContact);