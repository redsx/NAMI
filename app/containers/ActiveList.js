import React, { Component } from 'react'
import PureRender, { shouldComponentUpdate } from '../plugins/PureRender.js'
import immutable from 'immutable'
import { connect } from 'react-redux'
import { changeRoom } from '../actions/combin.js'
import language from '../config/language.js'
import autobind from 'autobind-decorator'
import ListItem from '../components/ListItem.jsx'
import item from '../util/item.js'

import '../less/ActiveList.less'

class ActiveListItem extends Component{
    constructor(props){
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    }
    @autobind
    handleClick(){
        const room = this.props.room;
        changeRoom(room.get('isPrivate'))(room.get('_id'));
    }
    render(){
        const { room, history } = this.props;
        const newProps = item.getItemInfo(room,history);
        return <ListItem {...this.props} {...newProps} handleClick = {this.handleClick}/>
    }
}

function ActiveList(props){
    const list = props.list.toJS ?props.list.toJS() : {};
    const histories = props.histories || immutable.fromJS({});
    return (
        <div className = 'ActiveList-container'>
            <ul className = 'List ActiveList-content'>
            {
                Object.keys(list).map((item)=>{
                    if(list[item]['name']){
                        const roomHis = list[item]['histories'] || [];
                        const history = histories.get(roomHis[roomHis.length - 1]);
                        return <ActiveListItem 
                                room = {immutable.fromJS(list[item])}
                                history = {history}
                                key = {`ActiveList-${item}`} 
                                isSelect = {list[item]['_id'] === props.curRoom}
                            />
                    }
                })
            }
            </ul>
        </div>
    );
}

export default connect(
    (state) => ({
        title: language.group,
        curRoom: state.getIn(['user','curRoom']),
        list: state.get('activeList'),
        histories: state.get('messages')
    })
)(PureRender(ActiveList));