import React, { Component } from 'react'
import immutable from 'immutable'
import language from '../config/language.js'
import { shouldComponentUpdate } from '../plugins/PureRender.js'
import autobind from 'autobind-decorator'
import ListItem from '../components/ListItem.jsx'
import { changeRoom } from '../actions/combin.js'
import timeDeal from '../util/time.js'

const ListContentWarp = (WrappedComponent) => class extends Component{
    constructor(props){
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    }
    getItemInfo(item,history = immutable.fromJS({})){
        let secondary,
            time,
            avatar = item.get('avatar'),
            name = item.get('name');
        if(history.get('owner')){
            secondary = history.getIn(['owner','nickname'])+ ':' + history.get('content') ;
            time = timeDeal.getTimeString(history.get('timestamp'));
        } else if(history.get('from')){
            secondary = history.get('content');
            time = timeDeal.getTimeString(history.get('timestamp'));
        } else {
            secondary = language.startConv;
            time = timeDeal.getTimeString(Date.now());
        }
        return {secondary,time,avatar,name}    
    }
    @autobind
    handleClick(){
        const room = this.props.room;
        changeRoom(room.get('isPrivate'))(room.get('_id'));
    }
    render(){
        const { room, history } = this.props;
        const newProps = this.getItemInfo(room,history);
        return <WrappedComponent {...this.props} {...newProps} handleClick = {this.handleClick}/>
    }
}
export default ListContentWarp(ListItem);